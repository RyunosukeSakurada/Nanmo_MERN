const express = require('express')
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
require("dotenv").config();


// DB接続
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBと接続中...");
  })
  .catch((error) => {
    console.log(error)
  })

  

app.listen(PORT, ()=> console.log("サーバーが起動しました"))
