import { useState } from "react"
import Button from "../../ui/global/Button"
import { Navigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStoreLogo from "../../ui/store/AddStoreLogo";


interface StoreInfomationProps{
  storeId?:string
  storeName?:string
  address?:string
  detailedAddress?:string
  postalCode?:string
  storeLogo?:string
  email?:string
}

const StoreInformation: React.FC<StoreInfomationProps> = ({storeId, storeName,address,detailedAddress,postalCode,email}) => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStoreInfo, setEditedStoreInfo] = useState({
    storeName,
    address,
    detailedAddress,
    postalCode,
    email
  });

   //toastify
  const notifyEditSuccess = () => toast.success('編集に成功しました 🎉', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyEditFail = () => toast.error('編集に失敗しました 😫', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyStoreNameTaken = () => toast.error('すでにその店舗名は使われています', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyEmailTaken = () => toast.error('すでにそのメールアドレスは使われています', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/logout`, {
        method: "POST",
      });

      if(response.ok) {
        setRedirect('/login');
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウトの際にエラーが発生しました:", error);
    }
  }

  if(redirect) {
    return <Navigate to={redirect} />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditedStoreInfo(prev => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/updateStore/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedStoreInfo),
      });
      const data = await response.json();
  
      if (response.status === 200) {
        notifyEditSuccess();
        setTimeout(logout, 3000);
      } else if (response.status === 400 && data.message.includes("指定された店舗名は既に存在しています")) {
        notifyStoreNameTaken();
      } else if (response.status === 400 && data.message.includes("指定されたメールアドレスは既に存在しています")) {
        notifyEmailTaken();
      }else {
        notifyEditFail();
      }
    } catch (error) {
      console.error("店舗情報の更新に問題が発生しました:", error);
    }
  };


  return (
    <div className="bg-white p-4 rounded-lg">
      <ToastContainer />
      <div className="">
        <h3 className="bold">店舗情報</h3>

        <div className="mt-6 flex gap-x-4">
          <AddStoreLogo storeId={storeId}/>

          {/* 店舗情報 */}
          <div className="flex-[2] flex flex-col gap-y-4 p-8 shadow relative">
            <div className="absolute bottom-6 right-6">
              <button 
                className="border rounded-lg px-4 py-1 hover:shadow hover:text-zinc-500"
                onClick={() => setIsEditing(true)}
              >
                編集
              </button>
            </div>

            <div className="flex gap-x-8 items-center">
              <div>
                <span className="text-zinc-500 text-[8px]">店舗名</span>
                <p>{storeName}</p>
              </div>
              <div>
                <span className="text-zinc-500 text-[8px]">郵便番号</span>
                <p>{postalCode}</p>
              </div>
            </div>
            <div>
              <span className="text-zinc-500 text-[8px]">住所</span>
              <p>{address}</p>
            </div>
            <div>
              <span className="text-zinc-500 text-[8px]">ビル/マンション</span>
              <p>{detailedAddress}</p>
            </div>
            <div>
              <span className="text-zinc-500 text-[8px]">メールアドレス</span>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[500px] break-words">
            <h3 className="mb-4 text-center">店舗情報を編集</h3>
            
            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-gray-500">店舗名</label>
              <input value={editedStoreInfo.storeName} onChange={e => handleChange(e, 'storeName')} className="mt-2 p-1 w-full border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-gray-500">住所</label>
              <input value={editedStoreInfo.address} onChange={e => handleChange(e, 'address')} className="mt-2 p-1 w-full border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-gray-500">ビル/マンション</label>
              <input value={editedStoreInfo.detailedAddress} onChange={e => handleChange(e, 'detailedAddress')} className="mt-2 p-1 w-full border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-gray-500">郵便番号</label>
              <input value={editedStoreInfo.postalCode} onChange={e => handleChange(e, 'postalCode')} className="mt-2 p-1 w-full border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-gray-500">メールアドレス</label>
              <input value={editedStoreInfo.email} onChange={e => handleChange(e, 'email')} className="mt-2 p-1 w-full border rounded" />
            </div>

            <div className="flex justify-center items-center">
              <Button className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleSave}>
                確定
              </Button>
              <Button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsEditing(false)}>
                戻る
              </Button>
            </div>
            <p className="mt-4 text-zinc-500 text-[8px] text-center">編集に成功後、新しい店舗情報をもとに再度ログインしてください</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreInformation
