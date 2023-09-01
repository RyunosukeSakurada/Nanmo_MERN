const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
require("dotenv").config();
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cors = require('cors');
const cookieParser = require('cookie-parser')


// DB接続
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((error: Error) => {
    console.log(error.message)
  })

app.use(cors({credentials:true ,origin:"http://localhost:5173"}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use('/uploads', express.static(__dirname + '/uploads'));
  

app.listen(PORT, ()=> console.log("サーバーが起動しました"))
