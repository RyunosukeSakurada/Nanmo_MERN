import { useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admin } from '../../model/admin/AdminTable';


const AddAdminInput: React.FC<{ onAdminAdded: (admin:Admin) => void }>  = ({ onAdminAdded }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   //toastify
  const notifyAddAdminSuccess = () => toast.success('Adminの登録に成功しました 🎉', 
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

  const notifyAddAdminFail = () => toast.error('Adminの登録に失敗しました 😫', 
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

  async function addAdmin(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/addadmin', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await res.json();
      
      if (res.status === 200) {
        notifyAddAdminSuccess();
        setEmail('');
        setPassword('');
        onAdminAdded(result);
      } else if (res.status === 400  && result.message.includes('このメールアドレスはすでに登録されています')) {
        notifyEmailAlreadyRegistered();
      } else {
        notifyAddAdminFail();
      }
    } catch (error) {
      notifyAddAdminFail();
      console.error(error)
    }
  }

  return (
    <div className='mt-6'>
      <ToastContainer />
      <form onSubmit={addAdmin} className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-x-8'>
          <div className='flex flex-col md:flex-row'>
            <label className='text-[8px]'>メールアドレス: </label>
            <input 
              type="email" 
              name="email" 
              required 
              className="px-2 py-1 rounded border border-gray-300 text-[12px] w-60 sm:w-40 md:w-60" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col md:flex-row'>
            <label className='text-[8px]'>パスワード: </label>
            <div>
              <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  className="px-2 py-1 rounded border border-gray-300 text-[12px] w-60 sm:w-40 md:w-60" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={togglePasswordVisibility} className="">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                </button>
            </div>
          </div>
        </div>
        <button type="submit" className="w-fit flex items-center border py-1 px-4 rounded text-[8px] hover:bg-slate-100 mt-2 md:mt-0">追加</button>
      </form>
    </div>
  );
}

export default AddAdminInput;
