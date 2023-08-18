import React, { useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../ui/global/Button';
import AccentButton from '../../ui/global/AccentButton';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
  const [registrationType, setRegistrationType] = useState<'user' | 'store'>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    storeName: '',
    address: '',
    postalCode: '',
    detailedAddress: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  //toastify
  const notifySignupSuccess = () => toast.success('登録に成功しました 🎉', 
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );

  // const notifySignupFail = () => toast.error('登録に失敗しました 😫', 
  //   {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   }
  // );

  // const notifyEmailAlreadyRegistered = () => toast.error('このメールアドレスはすでに登録されています', 
  //   {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   }
  // );

  //signup関数
  // const signup = async (data: any) => {
  //   try {
  //     const res = await fetch('/api/register', {  
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //     });
  //     const result = await res.json();
  //     console.log(result);

  //     if (res.status !== 201) {
  //       if (result.message === 'このメールアドレスはすでに登録されています') {
  //         notifyEmailAlreadyRegistered();
  //       } else {
  //         throw new Error(result.message);
  //       }
  //     } else {
  //       notifySignupSuccess();
  //     }
      
  //   } catch (error) {
  //     notifySignupFail();
  //     console.error(error)
  //   } finally {
  //   }
  // };

  //signup関数を呼び出す
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notifySignupSuccess()
  };

  //formDataの状態を更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //パスワードの可視性を切り替える
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 relative">
      <ToastContainer />
      <Link to="/">
        <h1 className='absolute top-0 left-0 px-24 py-5 text-2xl font-bold cursor-pointer'>Nanmo<span className='text-green-700'>.</span></h1>
      </Link>
      <h2 className="text-2xl text-gray-800">サインアップ</h2>
      <div className="flex gap-3 my-4">
        <Button onClick={() => setRegistrationType('user')} className="focus:bg-green-700 focus:text-white focus:border-0">ユーザーとして登録</Button>
        <Button onClick={() => setRegistrationType('store')} className="focus:bg-green-700 focus:text-white focus:border-0">店舗として登録</Button>
      </div>
      <form onSubmit={handleSubmit} className="text-start bg-white w-[450px] p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {registrationType === 'store' && (
            <>
              <div className="flex justify-between space-x-4">
                <div className="flex flex-col justify-between w-1/2">
                  <label className="text-lg text-gray-600">店舗名 <span className="text-[6px] text-red-500">※必須</span></label>
                  <input 
                    type="text" 
                    name="storeName" 
                    onChange={handleChange} 
                    required 
                    className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                    value={formData.storeName}
                  />
                </div>
                <div className="flex flex-col justify-between w-1/2">
                  <label className="text-lg text-gray-600">郵便番号<span className="text-[6px] text-red-500">※必須</span></label>
                  <input 
                    type="text" 
                    name="postalCode" 
                    onChange={handleChange} 
                    minLength={7} 
                    maxLength={7} 
                    placeholder='ハイフンは不要です' 
                    required 
                    className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                    value={formData.postalCode}
                  />
                </div>
              </div>
              <div className="flex justify-between space-x-4">
                <div className="flex flex-col justify-between w-1/2">
                  <label className="text-lg text-gray-600">住所 <span className="text-[6px] text-red-500">※必須</span></label>
                  <input 
                    type="text" 
                    name="address" 
                    onChange={handleChange} 
                    required 
                    placeholder="函館市..." 
                    className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                    value={formData.address}
                  />
                </div>
                <div className="flex flex-col justify-between w-1/2">
                  <label className="text-lg text-gray-600">ビル/マンション名</label>
                  <input 
                    type="text" 
                    name="detailedAddress" 
                    onChange={handleChange} 
                    className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                    value={formData.detailedAddress}
                  />
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col justify-between">
            <label className="text-lg text-gray-600">メールアドレス <span className="text-[6px] text-red-500">※必須</span></label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              required 
              className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
              value={formData.email}
            />
          </div>
          <div className="flex flex-col justify-between relative">
            <label className="text-lg text-gray-600">パスワード <span className="text-[6px] text-red-500">※必須</span></label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              onChange={handleChange} 
              required 
              className="px-2 py-1 w-full rounded border border-gray-300 text-[12px]" 
              value={formData.password}
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-12 -translate-y-1/2 ">
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <AccentButton type="submit" className="px-8 mt-8 mb-4">登録</AccentButton>
          <Link to="/login">
            <p className='text-[6px] text-gray-400'>すでにアカウントを持っている<span className='ml-1 border-b hover:text-green-700 cursor-pointer'>ログインする</span></p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
