import { Request, Response } from "express";
const Order = require("../models/Order"); 
const router = require("express").Router();

// 新しいOrderをDBに追加
router.post("/createOrder", async (req: Request, res: Response) => {  
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "注文の作成に失敗しました", error: (error as any).message });
  }
});

// ユーザーIDとstatus:pendingに基づいてOrderを取得
router.get("/getOrdersByUser/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId, status: 'pending' }).populate('items.product');
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error when fetching orders: ", error);
    return res.status(500).json({ message: "注文の取得に失敗しました", error: (error as any).message });
  }
});

//店舗ユーザーのIDに基づいてorderを取得
router.get("/getOrdersByStore/:storeId", async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const orders = await Order.find({ store: storeId}).populate('items.product').populate('user'); ;
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error when fetching orders: ", error);
    return res.status(500).json({ message: "注文の取得に失敗しました", error: (error as any).message });
  }
});

//orderのstatus
router.put("/updateOrderStatus/:orderId", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if(!order) {
      return res.status(404).json({ message: "注文が見つかりません" });
    }
    order.status = 'done';
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error when updating order status: ", error);
    return res.status(500).json({ message: "注文のステータスの更新に失敗しました", error: (error as any).message });
  }
});

// 全てのOrderを取得
router.get("/getAllOrders", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate('items.product').populate('user').populate('store');
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error when fetching all orders: ", error);
    return res.status(500).json({ message: "全ての注文の取得に失敗しました", error: (error as any).message });
  }
});

module.exports = router;
