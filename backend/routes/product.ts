import { Request, Response } from "express";
import multer from "multer";
import { TokenPayload } from "./auth";

const router = require("express").Router();
const uploadMiddleware = multer({dest: 'uploads/'})
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
      const { name, description, stocks, price, originalPrice, pickupDate, pickupTimeStart, pickupTimeEnd,isSold  } = req.body;
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
        },
        isSold,
      });
      res.json(productDoc);
    });
  } catch (error) {
    return res.status(500).json({ message: "商品の追加に失敗しました" });
  }
});

//全商品の取得
router.get("/getProducts", async (req: Request, res: Response) => {
  res.json(await Product.find().populate('store', 'storeName address detailedAddress -_id'))
})


// 特定の商品の取得
router.get("/getProduct/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('store', 'storeName address detailedAddress -_id');
    if (!product) {
      return res.status(404).json({ message: "商品が見つかりません" });
    }
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "商品の取得に失敗しました" });
  }
});


// 特定の店舗の商品を取得
router.get("/getProductsByStore", async (req: Request, res: Response) => {
  try {
    const {token} = req.cookies;
    jwt.verify(token, SECRET_TOKEN, {}, async(err:Error, info: TokenPayload) => {
      if (err) throw err;
      const products = await Product.find({store: info.id}).populate('store', 'storeName address detailedAddress -_id');
      if (!products) {
        return res.status(404).json({ message: "商品が見つかりません" });
      }
      res.json(products);
    });
  } catch (error) {
    return res.status(500).json({ message: "商品の取得に失敗しました" });
  }
});

module.exports = router;