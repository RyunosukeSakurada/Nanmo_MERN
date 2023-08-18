import { useState } from 'react'
import {AiOutlineArrowLeft,AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import {CiStar} from "react-icons/ci"
import { Link } from 'react-router-dom';
import AccentButton from '../../ui/global/AccentButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StoreDetailContent = () => {
  const [quantity, setQuantity] = useState(1); // 購入する数量の状態を追加

  const handlePurchase = () => {
    notifyPurchaseSuccess()
  }

  // 数量を増やす関数
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  }

  // 数量を減らす関数
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }

    //toastify
    const notifyPurchaseSuccess = () => toast.success(`購入が完了しました 🎉`, 
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

  return (
    <div>
      <ToastContainer />

      <Link to="/nanmo">
        <div className="flex items-center gap-x-1 group">
          <div className='p-2 group-hover:bg-white duration-300 rounded-full inline-block w-[40px] h-[40px]'>
            <AiOutlineArrowLeft size={22}/>
          </div>
          <p className="text-[6px] hover:text-green-700 duration-300">ホームに戻る</p>
        </div>
      </Link>

      <div className='bg-white rounded-lg p-4 mt-4 break-words relative'>
        <div>
          <div className='flex items-center gap-4'>
            <div>
              <img
                src={"/images/logo.png"}
                alt={"ロゴ画像"}
                width={100}
                height={100}
                className='object-fit w-[100px] h-[100px] rounded-full'
              />
            </div>
            <div>
              <h1 className='text-2xl font-bold'>XXXXXXX</h1>
              <p className=''>XX町X-XX-XX  XXXXXXXXXXXX</p>
            </div>
          </div>
          <div className='flex flex-col gap-y-1 mt-8'>
            <div className='mb-4 flex gap-x-8 items-center'>
              <span className='text-[12px]'>残り : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>2</span>個</span>
              <span className="text-[12px]">ジャンル : <span className="border border-green-700 px-2 py-1 rounded-md">飲食店</span></span>
              <span className='text-[12px]'>受取可能時間 : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>今日</span>9:00 - 19:00</span>
            </div>
            <p className='font-bold text-xl'>XXXXXXXXXXXXXXXXXXX</p>
            <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
        </div>

        <div className='flex justify-between items-center mt-8'>
          <p className='text-[12px] flex items-center gap-x-1'><CiStar size={25}/>3.8 (120)</p>
          <p><span className='font-bold text-3xl'>¥1,500</span><span className='text-[16px] ml-1 line-through p-0.5'>¥4,000</span></p>
        </div>


        <div className="absolute top-[5%] right-[5%] flex items-center gap-x-4">
          {/* 数量操作のセクションを追加 */}
          <div className='flex items-center gap-4 mt-1'>
            <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}><AiOutlinePlus /></button>
          </div>
          <AccentButton 
            onClick={handlePurchase}
          >
            購入する
          </AccentButton>
        </div>
      </div>
    </div>
  )
}

export default StoreDetailContent
