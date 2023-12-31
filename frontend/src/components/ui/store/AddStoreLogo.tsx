import { useCallback, useEffect, useState } from "react";
import Button from "../global/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  setUpdateStoreLogo?: React.Dispatch<React.SetStateAction<boolean>>;
  storeId?:string;
}

const AddStoreLogo = ({ setUpdateStoreLogo,storeId }: Props) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [storeLogo, setStoreLogo] = useState<string>("");
  
  const notifySuccess = () => toast.success('ロゴのアップロードに成功しました 🎉', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyFail = () => toast.error('ロゴのアップロードに失敗しました 😫', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  // storeLogoの取得
  const fetchStoreLogo = useCallback(async () => {   // useCallbackで関数をメモ化
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/getStoreLogo/${storeId}`);
      const data = await response.json();
  
      if (data.storeLogo) {
        setStoreLogo(data.storeLogo);
        console.log(data.storeLogo);
      } else {
        setStoreLogo("../../../../images/logo.png");
      }
    } catch (error) {
      console.error("ロゴの取得に失敗しました:", error);
    }
  }, [storeId]);  
  
  useEffect(() => {
    fetchStoreLogo();
  }, [fetchStoreLogo]); 
  

  
  async function uploadStoreLogo(e: { preventDefault: () => void }) {
    e.preventDefault();
  
    const data = new FormData();
    if (files) {
      data.append('file', files[0]);
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/uploadStoreLogo/${storeId}`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
  
      if (response.ok) {
        notifySuccess();
        setFiles(null);
        if(setUpdateStoreLogo){
          setUpdateStoreLogo((prev: boolean) => !prev);
        }
        fetchStoreLogo(); 
      } else {
        notifyFail();
      }
    } catch (error) {
      notifyFail();
      console.log(error);
    }
  }

  return (
    <div className="flex-[1] p-4 flex flex-col justify-center shadow">
      <ToastContainer />
      <img 
          src={`${storeLogo}`|| "../../../../images/logo.png"}
          alt="" 
          className="rounded-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] mx-auto"
      />
      <form className="flex flex-col mt-4 gap-y-4 p-4" onSubmit={uploadStoreLogo}>
        <input 
          type="file" 
          onChange={e => setFiles(e.target.files)} 
        />
        <Button>アップロード</Button>
      </form>
    </div>
  )
}

export default AddStoreLogo;
