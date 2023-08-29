import { Request, Response } from "express";


const bcrypt = require('bcrypt');
const router = require("express").Router();
const User = require("../models/User");
const Store = require("../models/Store");
const salt = bcrypt.genSaltSync(10); 
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = "fmcnirweruiqedkjfchf813";

interface UserRequest {
  email: string;
  password: string;
}

interface StoreRequest extends UserRequest {
  storeName: string;
  address: string;
  detailedAddress: string;
  postalCode: string;
}

interface LoginRequest {
  email: string;
  password: string;
}


router.post("/register", async(req: Request, res: Response) => {
  const userType = req.body.userType;

  // 既存のEメールアドレスをチェック
  const emailExists = await User.findOne({ email: req.body.email }) || await Store.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ message: "このメールアドレスはすでに登録されています" });
  }

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    if (userType === 'store') {
      const { email, password: hashedPassword, storeName, address, detailedAddress, postalCode } = req.body;

      if (!storeName || !address || !detailedAddress || !postalCode) {
        return res.status(400).json({ message: "店舗情報が不完全です" });
      }

      // 店舗ユーザーとして登録
      const newStore = new Store({
        email,
        password: hashedPassword,
        storeName,
        address,
        detailedAddress,
        postalCode,
      });
      const store = await newStore.save();
      return res.status(200).json(store);
    } else if (userType === 'user') {
      const { email, password: hashedPassword } = req.body;

      // 一般ユーザーもしくはadminとして登録
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "無効なユーザータイプ" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});




// ログイン
router.post("/login", async(req: Request<LoginRequest>, res: Response)=> {
  try {
    const { email, password } = req.body;

    // メールアドレスでユーザーを検索
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      // ハッシュ化されたパスワードを検証
      const passOk = await bcrypt.compare(password, userDoc.password)
      if(passOk){
        jwt.sign({id:userDoc._id, type: userDoc.isAdmin ? 'admin' : 'user',email},SECRET_TOKEN,{expiresIn: "7d"},(err:Error, token:string) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            email,
          });
        })
        return; // Exit the function after sending response
      }
    }

    // メールアドレスでストアを検索
    const storeDoc = await Store.findOne({ email });
    if (storeDoc) {
      // ハッシュ化されたパスワードを検証
      const passOk = await bcrypt.compare(password, storeDoc.password)
      if(passOk){
        jwt.sign({id:storeDoc._id,type:'store',email},SECRET_TOKEN,{expiresIn: "7d"},(err:Error, token:string) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:storeDoc._id,
            email,
          });
        })
        return; // Exit the function after sending response
      }
    }

    return res.status(404).json({ message: "無効なメールアドレスもしくはパスワードです" });

  } catch (error) {
    console.error("Failed to load resource: " + (error as any).message);
    return res.status(500).json({ message: "サーバーエラー" });
  }
});


//ログアウト
router.post("/logout", async(req: Request, res: Response)=> {
  res.cookie('token','').json('ok')
})


//adminの追加
router.post("/addadmin", async(req: Request<UserRequest>, res: Response) => {
  const { email, password } = req.body;

  // 既存のEメールアドレスをチェック
  const emailExists = await User.findOne({ email }) || await Store.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "このメールアドレスはすでに登録されています" });
  }
  
  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // adminとして登録
    const newAdmin = new User({
      email,
      password: hashedPassword,
      isAdmin: true  // ここでisAdminをtrueに設定
    });

    const admin = await newAdmin.save();
    return res.status(200).json(admin);

  } catch (error) {
    return res.status(500).json(error);
  }
});


//token認証
router.get("/profile", async(req: Request, res: Response) => {
  const {token} = req.cookies;
  jwt.verify(token, SECRET_TOKEN, {}, (err:Error, info:string) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json(info);
  });
});


module.exports = router;
