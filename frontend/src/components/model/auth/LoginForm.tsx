
import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccentButton from '../../ui/global/AccentButton';
import { Link } from 'react-router-dom';
import {Navigate} from "react-router-dom";
import { UserContext } from '../../../context/UserContext';


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState<string | null>(null);
  const {setUserInfo} = useContext(UserContext)

  //パスワードの可視性を切り替える
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //toastify
  const notifyLoginSuccess = () => toast.success('ログインに成功しました 🎉', 
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
  const notifyLoginFail = () => toast.error('ログインに失敗しました 😫', 
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


//login関数
async function login(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email,password}),
      credentials: 'include',
    });
    
    const result = await res.json();
    console.log(result);
    
    
    if (res.status === 200) {
      setUserInfo(result)
      notifyLoginSuccess();
      setTimeout(() => {
        if(result.isStore === true) {
            setRedirect('/store/dashboard');
        } else if (result.isAdmin === true && result.isStore === false) {
            setRedirect('/admin/dashboard');
        } else if (result.isAdmin === false && result.isStore === false) {
            setRedirect('/nanmo');
        }
      }, 3000);
    } else {
      notifyLoginFail();
      console.error(result.message); 
    }
  } catch (error) {
    notifyLoginFail();
    console.error(error);
  }
}

//ログインしたユーザーがuser/store/adminのどれかに分類→ /nanmoか各dashboardにRedirect
if (redirect) {
  return <Navigate to={redirect} />;
}
    
  return (
    <div className="bg-gray-200">
      <ToastContainer />
      <Link to="/">
        <h1 className='text-start px-24 py-5 text-2xl font-bold cursor-pointer'>Nanmo<span className='text-green-700'>.</span></h1>
      </Link>
      <div className="flex flex-col items-center justify-center h-screen -mt-20">
        <h2 className="text-2xl text-gray-800 mb-4">ログイン</h2>
        <form onSubmit={login} className="text-start bg-white w-[300px] sm:w-[450px] p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex flex-col justify-between">
              <label className="text-lg text-gray-600">メールアドレス</label>
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
              <label className="text-lg text-gray-600">パスワード</label>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required 
                className="px-2 py-1 w-full rounded border border-gray-300 text-[12px]" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-11 transform -translate-y-1/2 ">
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
              </button>
            </div>
            <span className='text-[6px] border-b incline cursor-pointer text-gray-400 hover:text-green-700'>パスワードを忘れた方はこちら</span>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <AccentButton type="submit" className="px-8 mt-8 mb-4">ログイン</AccentButton>
            <Link to="/register">
              <p className='text-[6px] text-gray-400'>アカウントを持っていない<span className='ml-1 border-b hover:text-green-700 cursor-pointer'>サインアップする</span></p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
