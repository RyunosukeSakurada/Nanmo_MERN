import { Request, Response } from "express";
import multer from "multer";
import path from 'path'


const router = require("express").Router();
const User = require("../models/User");
const Store = require("../models/Store")
const Contact = require("../models/Contact");
const pathToUploads = path.join(process.cwd(),'backend','src','uploads');
const uploadMiddleware = multer({dest: pathToUploads})
const fs = require("fs")

declare module 'express' {
  interface Request {
      file: Express.Multer.File;
  }
}

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

//全adminuserの取得
router.get("/adminusers", async (req: Request, res: Response) => {
  try {
    const adminUsers = await User.find({ isAdmin: true }).lean().exec();
    return res.status(200).json(adminUsers);
  } catch (error) {
    return res.status(500).json({ message: "Adminユーザーの情報の取得に失敗しました", error });
  }
});

//一時利用停止ユーザーの取得
router.get("/suspendedusers", async (req: Request, res: Response) => {
  try {
    const suspendedUsers = await User.find({ suspended: true }).lean().exec();
    const suspendedStores = await Store.find({ suspended: true }).lean().exec();

    //ユーザーオブジェクトにtypeプロパティを追加
    suspendedUsers.forEach((user: { type: string; }) => user.type = '一般ユーザー');
    suspendedStores.forEach((store: { type: string; }) => store.type = '店舗ユーザー');

    //一時停止されたユーザーと店舗のリストを結合
    return res.status(200).json([...suspendedUsers, ...suspendedStores]);
  } catch (error) {
    return res.status(500).json({ message: "サーバーエラー", error });
  }
});

//ブロックユーザーの取得
router.get("/blockedusers", async (req: Request, res: Response) => {
  try {
    const blockedUsers = await User.find({ blocked: true }).lean().exec();
    const blockedStores = await Store.find({ blocked: true }).lean().exec();

    //ユーザーオブジェクトにtypeプロパティを追加
    blockedUsers.forEach((user: { type: string; }) => user.type = '一般ユーザー');
    blockedStores.forEach((store: { type: string; }) => store.type = '店舗ユーザー');

    //一時停止されたユーザーと店舗のリストを結合
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
    
    const updatedStore = await Store.findByIdAndUpdate(
      storeId, 
      { requested: true }, 
      { new: true }
    );
    return res.status(200).json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "承認申請の処理に失敗しました", error });
  }
});


//店舗の承認申請ステータスを確認
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

// お問い合わせ情報の送信
router.post("/submitContact", async (req: Request, res: Response) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(201).json({ message: "お問い合わせを保存しました" });
  } catch (error) {
    return res.status(500).json({ message: "お問い合わせの保存に失敗しました", error });
  }
});

//店舗情報の更新
router.put("/updateStore/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const updatedData = req.body;

    // 更新されたstoreNameが存在する場合、重複をチェック
    if (updatedData.storeName) {
      const existingStore = await Store.findOne({ storeName: updatedData.storeName });

      // 既存の店舗で同じstoreNameが見つかった場合、エラーレスポンスを返す
      if (existingStore && String(existingStore._id) !== storeId) {
        return res.status(400).json({ message: "指定された店舗名は既に存在しています" });
      }
    }

    // 更新されたemailが存在する場合、重複をチェック
    if (updatedData.email) {
      const existingStoreWithEmail = await Store.findOne({ email: updatedData.email });

      // 既存の店舗で同じemailが見つかった場合、エラーレスポンスを返す
      if (existingStoreWithEmail && String(existingStoreWithEmail._id) !== storeId) {
        return res.status(400).json({ message: "指定されたメールアドレスは既に存在しています" });
      }
    }

    const updatedStore = await Store.findByIdAndUpdate(storeId, updatedData, { new: true });
    if (!updatedStore) {
      return res.status(404).json({ message: "指定された店舗が見つかりませんでした" });
    }

    return res.status(200).json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "店舗情報の更新に失敗しました", error });
  }
});


//店舗ユーザーのロゴをアップデート
router.post("/uploadStoreLogo/:storeId", uploadMiddleware.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "ファイルがアップロードされていません" });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const storeId = req.params.storeId;
    const updatedStore = await Store.findByIdAndUpdate(storeId, { storeLogo: newPath }, { new: true });

    if (!updatedStore) {
      return res.status(404).json({ message: "指定された店舗が見つかりません" });
    }

    res.json(updatedStore);
  } catch (error) {
    return res.status(500).json({ message: "店舗のロゴの更新に失敗しました" });
  }
});

//特定の店舗ユーザーのロゴを取得
router.get("/getStoreLogo/:storeId", async (req: Request, res: Response) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "指定された店舗が見つかりません" });
    }

    res.json({ storeLogo: store.storeLogo });
  } catch (error) {
    return res.status(500).json({ message: "店舗のロゴの取得に失敗しました" });
  }
});




module.exports = router;