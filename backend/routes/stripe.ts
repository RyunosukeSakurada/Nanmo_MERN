import { Request, Response } from "express";

const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post("/payment", async (req:Request, res:Response) => {
    try {
        const paymentId = req.body.paymentId;
        const amount = req.body.amount; 

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: 'jpy',
            payment_method: paymentId,
            confirm: true,
            // 追加: return_urlの指定
            return_url: 'http://localhost:5173/payment-success' // このURLは実際の完了ページのURLに変更してください。
        });

        if(paymentIntent.status === 'succeeded') {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "決済に失敗しました" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: (error as any).message });
    }
});


module.exports = router;