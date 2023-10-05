import { Request, Response, NextFunction } from 'express';

const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
require("dotenv").config();
const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
const stripeRoute = require('./src/routes/stripe')
const orderRoute = require('./src/routes/order')
const cors = require('cors');
const cookieParser = require('cookie-parser')

// DB接続
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((error: { message: any; }) => {
    console.log(error.message)
  })

// app.use((req:Request, res:Response, next:NextFunction) => {
//   const allowedOrigins = [process.env.ORIGIN_URL , "http://localhost:5173" ]; 
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     cors({ origin: true, credentials: true })(req, res, next);
//   } else {
//     cors({ origin: false, credentials: true })(req, res, next);
//   }
// });

// app.use((req:Request, res:Response, next:NextFunction) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());
app.use(function (req:Request, res:Response, next:NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/stripe", stripeRoute)
app.use("/api/order", orderRoute)

app.use("/", (_req: Request, res: Response) => res.send({ msg: `Health check OK ${process.env.ORIGIN_URL}`}));

app.listen(PORT, ()=> console.log("サーバーが起動しました"))