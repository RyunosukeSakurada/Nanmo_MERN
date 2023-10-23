require("dotenv").config();
const cors = require('cors');
import { Request, Response } from 'express';

const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
const stripeRoute = require('./src/routes/stripe')
const orderRoute = require('./src/routes/order')
const cookieParser = require('cookie-parser')

// DB接続
mongoose
  .connect(process.env.MONGO_URL) 
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((error: { message: any; }) => {
    console.log("mongoose error" + error.message)
  })


app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.set("trust proxy", 1);
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/stripe", stripeRoute)
app.use("/api/order", orderRoute)

app.use("/", (_req: Request, res: Response) => res.send({ msg: `Health check OK ${process.env.ORIGIN_URL}`}));

app.listen(PORT, ()=> console.log("サーバーが起動しました"))