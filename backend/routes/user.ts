import { Request, Response } from "express";

const router = require("express").Router();
const User = require("../models/User");
const Store = require("../models/Store")


//全一般ユーザーの情報を取得
router.get("/userslist", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "ユーザーの情報の取得に失敗しました" });
  }
});


//全店舗ユーザーの情報を取得
router.get("/storeslist", async (req: Request, res: Response) => {
  try {
    const stores = await Store.find({});
    return res.status(200).json(stores);
  } catch (error) {
    return res.status(500).json({ message: "ユーザーの情報の取得に失敗しました" });
  }
});


router.get("/adminusers", async (req: Request, res: Response) => {
  try {
    const adminUsers = await User.find({ isAdmin: true }).lean().exec();
    return res.status(200).json(adminUsers);
  } catch (error) {
    return res.status(500).json({ message: "Adminユーザーの情報の取得に失敗しました", error });
  }
});


router.get("/suspendedusers", async (req: Request, res: Response) => {
  try {
    const suspendedUsers = await User.find({ suspended: true }).lean().exec();
    const suspendedStores = await Store.find({ suspended: true }).lean().exec();

    suspendedUsers.forEach((user: { type: string; }) => user.type = '一般ユーザー');
    suspendedStores.forEach((store: { type: string; }) => store.type = '店舗ユーザー');

    return res.status(200).json([...suspendedUsers, ...suspendedStores]);
  } catch (error) {
    return res.status(500).json({ message: "サーバーエラー", error });
  }
});

router.get("/blockedusers", async (req: Request, res: Response) => {
  try {
    const blockedUsers = await User.find({ blocked: true }).lean().exec();
    const blockedStores = await Store.find({ blocked: true }).lean().exec();

    blockedUsers.forEach((user: { type: string; }) => user.type = '一般ユーザー');
    blockedStores.forEach((store: { type: string; }) => store.type = '店舗ユーザー');

    return res.status(200).json([...blockedUsers, ...blockedStores]);
  } catch (error) {
    return res.status(500).json({ message: "サーバーエラー", error });
  }
});


// ユーザー削除
router.delete("/deleteuser/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "ユーザーを削除しました" });
  } catch (error) {
    return res.status(500).json({ message: "ユーザーの削除に失敗しました", error });
  }
});

//店舗ユーザー削除
router.delete("/deletestore/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    await Store.findByIdAndDelete(storeId);
    return res.status(200).json({ message: "店舗ユーザーを削除しました" });
  } catch (error) {
    return res.status(500).json({ message: "店舗ユーザーの削除に失敗しました", error });
  }
});


// 店舗の承認申請ステータスを更新
router.put("/requestapproval/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId).lean().exec();

    if (!store) {
      return res.status(404).json({ message: "指定された店舗が見つかりませんでした" });
    }
    if (store.requested) {
      return res.status(400).json({ message: "承認申請はすでに送信されています" });
    }
    
    const updatedStore = await Store.findByIdAndUpdate(storeId, { requested: true }, { new: true });
    return res.status(200).json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "承認申請の処理に失敗しました", error });
  }
});


// 店舗の承認申請ステータスを確認
router.get("/checkapproval/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId).lean().exec();

    if (!store) {
      return res.status(404).json({ message: "指定された店舗が見つかりませんでした" });
    }

    return res.status(200).json({ requested: store.requested });
  } catch (error) {
    return res.status(500).json({ message: "承認申請ステータスの取得に失敗しました", error });
  }
});

// 店舗の承認を許可
router.put("/approveStore/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;

    const updatedStore = await Store.findByIdAndUpdate(storeId, { approved: true }, { new: true });

    if (!updatedStore) {
      return res.status(404).json({ message: "指定された店舗が見つかりませんでした" });
    }

    return res.status(200).json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "店舗の承認に失敗しました", error });
  }
});

// 店舗の承認を却下
router.put("/declineStore/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;

    // requestDeclined を true にし、requested を false に設定
    const updatedStore = await Store.findByIdAndUpdate(storeId, { requestDeclined: true, requested: false }, { new: true });

    if (!updatedStore) {
      return res.status(404).json({ message: "指定された店舗が見つかりませんでした" });
    }

    return res.status(200).json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "店舗の却下に失敗しました", error });
  }
});


module.exports = router;