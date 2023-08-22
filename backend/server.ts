const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
require("dotenv").config();
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const cors = require('cors');

// DB接続
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((error: Error) => {
    console.log(error.message)
  })

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
  

app.listen(PORT, ()=> console.log("サーバーが起動しました"))
