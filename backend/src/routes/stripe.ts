import { Request, Response } from "express";

const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);66

router.post("/payment", async (req:Request, res:Response) => {
    try {
        const paymentId = req.body.paymentId;
        const amount = req.body.amount; 

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: 'jpy',
            payment_method: paymentId,
            confirm: true,
            return_url: `${process.env.ORIGIN_URL}/payment-success`
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