import React, { useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../ui/global/Button';
import AccentButton from '../../ui/global/AccentButton';
import { Link } from 'react-router-dom';
import {Navigate} from "react-router-dom";


const RegisterForm: React.FC = () => {
  const [registrationType, setRegistrationType] = useState<'user' | 'store'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [redirect, setRedirect] = useState(false);

  //toastify
  const notifyRegisterSuccess = () => toast.success('登録に成功しました 🎉', 
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

  const notifyRegisterFail = () => toast.error('登録に失敗しました 😫', 
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

  const notifyEmailAlreadyRegistered = () => toast.error('このメールアドレスはすでに登録されています', 
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

  //パスワードの可視性を切り替える
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  //register関数
  async function register(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      let body;
      if(registrationType === 'user') {
        body = JSON.stringify({email, password, userType: 'user'});
      } else {
        body = JSON.stringify({email, password, storeName, address, detailedAddress, postalCode, userType: 'store'});
      }

      const res = await fetch('http://localhost:4000/api/auth/register', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });

      const result = await res.json();
      console.log(result);
      
      if (res.status === 200) {
        notifyRegisterSuccess();
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      } else if (res.status === 400 && result.message.includes('このメールアドレスはすでに登録されています')) {
        notifyEmailAlreadyRegistered();
      } else {
        notifyRegisterFail();
      }
    } catch (error) {
      notifyRegisterFail();
      console.error(error)
    }
  }


  if (redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="bg-gray-200">
      <ToastContainer />
      <Link to="/">
        <h1 className='text-start px-24 py-5 text-2xl font-bold cursor-pointer'>Nanmo<span className='text-green-700'>.</span></h1>
      </Link>
      <div className={`flex flex-col items-center justify-center h-screen ${registrationType !== 'user' ? 'mt-20' : 'mt-0'} sm:mt-0`}>
        <h2 className="text-2xl text-gray-800">サインアップ</h2>
        <div className="flex flex-col sm:flex-row gap-3 my-4">
          <Button onClick={() => setRegistrationType('user')} className="focus:bg-green-700 focus:text-white focus:border-0">ユーザーとして登録</Button>
          <Button onClick={() => setRegistrationType('store')} className="focus:bg-green-700 focus:text-white focus:border-0">店舗として登録</Button>
        </div>
        <form onSubmit={register} className="text-start bg-white w-[300px] sm:w-[450px] p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {registrationType === 'store' && (
              <>
                <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 ">
                  <div className="flex flex-col justify-between w-full sm:w-1/2">
                    <label className="text-lg text-gray-600">店舗名 <span className="text-[6px] text-red-500">※必須</span></label>
                    <input 
                      type="text" 
                      name="storeName" 
                      required 
                      className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                      value={storeName}
                      onChange={e => setStoreName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full sm:w-1/2">
                    <label className="text-lg text-gray-600">郵便番号<span className="text-[6px] text-red-500">※必須</span></label>
                    <input 
                      type="text" 
                      name="postalCode" 
                      minLength={7} 
                      maxLength={7} 
                      placeholder='ハイフンは不要です' 
                      required 
                      className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
                  <div className="flex flex-col justify-between w-full sm:w-1/2">
                    <label className="text-lg text-gray-600">住所 <span className="text-[6px] text-red-500">※必須</span></label>
                    <input 
                      type="text" 
                      name="address" 
                      required 
                      placeholder="函館市..." 
                      className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full sm:w-1/2">
                    <label className="text-lg text-gray-600">ビル/マンション名</label>
                    <input 
                      type="text" 
                      name="detailedAddress" 
                      className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                      value={detailedAddress}
                      onChange={e => setDetailedAddress(e.target.value)}
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
                required 
                className="px-2 py-1 rounded border border-gray-300 text-[12px]" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-between relative">
              <label className="text-lg text-gray-600">パスワード <span className="text-[6px] text-red-500">※必須</span></label>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                className="px-2 py-1 w-full rounded border border-gray-300 text-[12px]" 
                value={password}
                onChange={e => setPassword(e.target.value)}
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
    </div>
  )
}

export default RegisterForm
