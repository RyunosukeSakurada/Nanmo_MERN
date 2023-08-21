import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const router = require("express").Router();
const User = require("../models/User");
const Store = require("../models/Store");
const salt = bcrypt.genSaltSync(10); 


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

//ユーザー登録
router.post("/register", async(req: Request<UserRequest> | Request<StoreRequest>, res: Response) => {
  const { email, password, storeName, address, detailedAddress, postalCode } = req.body;

  // 既存のEメールアドレスをチェック
  const emailExists = await User.findOne({ email }) || await Store.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "このメールアドレスはすでに登録されています" });
  }
  
  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    if (storeName) {
      // 店舗ユーザーとして登録
      const newStore = new Store({
        email,
        password: hashedPassword,
        storeName,
        address,
        detailedAddress,
        postalCode
      });
      const store = await newStore.save();
      return res.status(200).json(store);
    } else {
      // 一般ユーザーもしくはadminとして登録
      const newUser = new User({
        email,
        password: hashedPassword
      });
      const user = await newUser.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


//ログイン
router.post("/login", async(req: Request<LoginRequest>, res: Response)=> {
  try {
    const { email, password } = req.body;

    // メールアドレスでユーザーを検索
    const user = await User.findOne({ email });
    if (user) {
      // ハッシュ化されたパスワードを検証
      if(await bcrypt.compare(password, user.password)) {
        return res.status(200).json(user);
      }
    }

    // メールアドレスでストアを検索
    const store = await Store.findOne({ email });
    if (store) {
      // ハッシュ化されたパスワードを検証
      if(await bcrypt.compare(password, store.password)) {
        return res.status(200).json(store);
      }
    }

    return res.status(404).json({ message: "無効なメールアドレスもしくはパスワードです" });

  } catch (error) {
    console.error("Failed to load resource: " + (error as any).message); 
    return res.status(500).json({ message: "サーバーエラー" }); 
  }
});



module.exports = router;
