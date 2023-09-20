import { Request, Response } from "express";
import multer from "multer";
import { TokenPayload } from "./auth";
import path from 'path'

const router = require("express").Router();
const fs = require("fs")
const Product = require("../models/Product");
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = "fmcnirweruiqedkjfchf813";
const pathToUploads = path.join(process.cwd(),'backend','src','uploads');
const uploadMiddleware = multer({dest: pathToUploads})


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
    //ファイルの元の名前から拡張子を取得し、ファイルのパスに追加
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
        store: info.id,
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
  res.json(await Product.find().populate('store', 'storeName address detailedAddress storeLogo -_id'))
})

// 特定の商品の取得
router.get("/getProduct/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('store', '_id storeName address detailedAddress storeLogo');
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
      const products = await Product.find({store: info.id}).populate('store', 'storeName address detailedAddress storeLogo -_id');
      if (!products) {
        return res.status(404).json({ message: "商品が見つかりません" });
      }
      res.json(products);
    });
  } catch (error) {
    return res.status(500).json({ message: "商品の取得に失敗しました" });
  }
});

// 特定の商品の削除
router.delete("/deleteProduct/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "指定された商品が見つかりませんでした" });
    }
    return res.status(200).json({ message: "商品を削除しました" });
  } catch (error) {
    return res.status(500).json({ message: "商品の削除に失敗しました" });
  }
});

// Productのstocksを更新
router.put("/updateProductStock/:productId", async (req: Request, res: Response) => {
  try {
    //URLからproductIdを取得
    const { productId } = req.params;
    //リクエストボディからquantityを取得
    const { quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "製品が見つかりません" });
    }

    //在庫が足りない場合
    if (product.stocks - quantity < 0) {
      return res.status(400).json({ message: "在庫が足りません" });
    }
    //在庫を指定された数量だけ減少
    product.stocks -= quantity;
    //在庫が更新された製品情報をデータベースに保存
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error when updating product stocks: ", error);
    return res.status(500).json({ message: "製品の在庫の更新に失敗しました", error: (error as any).message });
  }
});


module.exports = router;