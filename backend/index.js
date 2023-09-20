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
  .catch((error) => {
    console.log(error.message)
  })

app.use(cors({credentials:true ,origin:"https://nanmo-mern.vercel.app"}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/stripe", stripeRoute)
app.use("/api/order", orderRoute)
app.use('/uploads', express.static(__dirname + '/uploads'));
  

app.listen(PORT, ()=> console.log("サーバーが起動しました"))

