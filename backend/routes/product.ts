import { Request, Response } from "express";
import multer from "multer";
import { TokenPayload } from "./auth";

const router = require("express").Router();
const uploadMiddleware = multer({dest: 'upload/'})
const fs = require("fs")
const Product = require("../models/Product");
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = "fmcnirweruiqedkjfchf813";


declare module 'express' {
    interface Request {
        file: Express.Multer.File;
    }
}

//商品の追加
router.post("/addProduct", uploadMiddleware.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "ファイルがアップロードされていません" });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, SECRET_TOKEN, {}, async(err:Error, info: TokenPayload) => {
      if (err) throw err
      const { name, description, stocks, price, originalPrice, pickupDate, pickupTimeStart, pickupTimeEnd  } = req.body;
      const productDoc = await Product.create({
        name,
        description,
        productImage: newPath,
        stocks,
        price,
        originalPrice,
        store:info.id,
        pickupDate,
        pickupTime: {
          start: pickupTimeStart,
          end: pickupTimeEnd
        }
      });
      res.json(productDoc);
    });
  } catch (error) {
    return res.status(500).json({ message: "商品の追加に失敗しました" });
  }
});

//商品の取得
router.get("/getProducts",async (req: Request, res: Response) => {
  res.json(await Product.find().populate('store', 'storeName address -_id detailedAddress'))
})


module.exports = router;