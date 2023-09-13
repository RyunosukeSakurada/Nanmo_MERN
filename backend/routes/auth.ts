import { Request, Response } from "express";


const bcrypt = require('bcrypt');
const router = require("express").Router();
const User = require("../models/User");
const Store = require("../models/Store");
const FAQ = require("../models/FAQ");
const Contact = require("../models/Contact");
const salt = bcrypt.genSaltSync(10); 
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = "fmcnirweruiqedkjfchf813";

interface UserRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
  isAdmin?: boolean;
  isStore?: boolean;
  approved?:boolean;
  requestDeclined?:boolean;
  storeLogo?:string,
}

export interface TokenPayload {
  id: string;
  email: string;
  isAdmin?: boolean;
  isStore?: boolean;
  approved?:boolean;
  requestDeclined?:boolean;
  storeLogo?:string,
}

interface FAQRequest {
  question: string;
  answer: string;
}


//ユーザー登録
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
      const { email, storeName, address, detailedAddress, postalCode } = req.body;

      if (!storeName || !address || !postalCode) {
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
      const { email } = req.body;

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
        jwt.sign({id:userDoc._id, email,isAdmin: userDoc.isAdmin, isStore: false,},SECRET_TOKEN,{expiresIn: "7d"},(err:Error, token: TokenPayload) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            email,
            type: 'user',
            isAdmin: userDoc.isAdmin,
            isStore: userDoc.isStore,
          });
        })
        return; 
      }
    }

    // メールアドレスでストアを検索
    const storeDoc = await Store.findOne({ email });
    if (storeDoc) {
      // ハッシュ化されたパスワードを検証
      const passOk = await bcrypt.compare(password, storeDoc.password)
      if(passOk){
        jwt.sign({
          id:storeDoc._id,
          email,
          isStore: true,
          approved:storeDoc.approved,
          requestDeclined:storeDoc.requestDeclined,
          address:storeDoc.address,
          detailedAddress:storeDoc.detailedAddress,
          postalCode:storeDoc.postalCode,
          storeName:storeDoc.storeName,
          storeLogo:storeDoc.storeLogo,
        },SECRET_TOKEN,{expiresIn: "7d"},(err:Error, token: TokenPayload) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:storeDoc._id,
            email,
            type: 'store',
            isStore: true,
            approved:storeDoc.approved,
            requestDeclined:storeDoc.requestDeclined,
            storeName:storeDoc.storeName,
            storeLogo:storeDoc.storeLogo,
          });
        })
        return; 
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
      isAdmin: true
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

// 一般ユーザーの状態の更新(Admin Dashboard)
router.put("/updateuserstatus/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { suspended, blocked } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId, 
      { suspended, blocked },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりませんでした" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// 店舗ユーザーの状態の更新(Admin Dashboard)
router.put("/updatestorestatus/:storeId", async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const { suspended, blocked } = req.body;

  try {
    const store = await Store.findByIdAndUpdate(
      storeId, 
      { suspended, blocked },
      { new: true } 
    );

    if (!store) {
      return res.status(404).json({ message: "店舗ユーザーが見つかりませんでした" });
    }

    return res.status(200).json(store);
  } catch (error) {
    return res.status(500).json(error);
  }
});


router.post("/addfaq", async (req: Request<FAQRequest>, res: Response) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: "質問と回答は必須です" });
  }

  try {
    const newFAQ = new FAQ({ question, answer });
    const savedFAQ = await newFAQ.save();
    return res.status(200).json(savedFAQ);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/getfaqs", async (req: Request<FAQRequest>, res: Response) => {
  try {
    const faqs = await FAQ.find({});
    return res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/deletefaq/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await FAQ.findByIdAndDelete(id);
    return res.status(200).json({ message: "FAQが削除されました" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/editfaq/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { question, answer } = req.body;

  try {
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQが見つかりません" });
    }
    faq.question = question;
    faq.answer = answer;
    await faq.save();
    return res.status(200).json({ message: "FAQが更新されました", faq });
  } catch (error) {
    return res.status(500).json(error);
  }
});


// お問い合わせ情報を全て取得
router.get("/getAllContacts", async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: "お問い合わせの取得に失敗しました", error });
  }
});

//お問い合わせの未読を既読に変える
router.post("/toggleReadStatus/:contactId", async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "お問い合わせが見つかりませんでした" });
    }
    contact.isRead = !contact.isRead; // 現在の状態を反転
    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: "お問い合わせの更新に失敗しました", error });
  }
});

//お問い合わせの未読を既読に変える
router.post("/toggleHandleStatus/:contactId", async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "お問い合わせが見つかりませんでした" });
    }
    contact.isHandled = !contact.isHandled; // 現在の状態を反転
    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: "お問い合わせの更新に失敗しました", error });
  }
});


module.exports = router;
