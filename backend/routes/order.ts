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
    console.error("Error when creating order: ", error);   
    return res.status(500).json({ message: "注文の作成に失敗しました", error: (error as any).message });
  }
});

// ユーザーIDとstatusに基づいてOrderを取得
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

module.exports = router;
