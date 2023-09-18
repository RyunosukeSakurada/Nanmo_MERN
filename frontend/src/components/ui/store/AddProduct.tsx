import { useState } from "react"
import Button from "../global/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  approved?: boolean;
  suspended?:boolean;
  blocked?:boolean;
  setUpdateProductList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct = ({ setUpdateProductList, approved,blocked,suspended }: Props) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<FileList | null>(null);
  const [stocks, setStocks] = useState("")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTimeStart, setPickupTimeStart] = useState("");
  const [pickupTimeEnd, setPickupTimeEnd] = useState("");

  //notify
  const notifySuccess = () => toast.success('商品の追加に成功しました 🎉', 
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
  const notifyFail = () => toast.error('商品の追加に失敗しました 😫', 
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

  async function addNewProduct(e: { preventDefault: () => void }) {
    e.preventDefault();
    
    //受け取り時間でのエラーを防ぐ
    if (parseInt(pickupTimeStart) >= parseInt(pickupTimeEnd)) {
      notifyFail();
      toast.error('開始時間は終了時間より早くなければなりません', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      return;
    }
    //ストックが0未満になるのを防ぐ
    if(parseInt(stocks) < 0){
      notifyFail();
      toast.error('在庫数は1以上でなければなりません', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      return;
    }

    const data = new FormData();
    data.set('name', name);
    data.set('description', description);
    data.set('stocks', stocks);
    data.set('price', price);
    data.set('originalPrice', originalPrice);
    data.set('pickupDate', pickupDate);
    data.set('pickupTimeStart', pickupTimeStart);
    data.set('pickupTimeEnd', pickupTimeEnd);
    if (files) {
      data.append('file', files[0]);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/addProduct`,{
        method: 'POST',
        body: data,
        credentials: 'include',
      });
  
      if (response.ok) {
        notifySuccess();
        //formを空にする
        setName("");
        setDescription("");
        setFiles(null);
        setStocks("");
        setPrice("");
        setOriginalPrice("");

        setUpdateProductList((prev: boolean) => !prev)
      } else {
        notifyFail();
      }
    } catch (error) {
      notifyFail();
    }
  }

  return (
    <div className="flex-[1]">
      <ToastContainer />
    <span className="text-zinc-500">新規商品の追加</span>
      {!blocked || !suspended ? (
        <p className="mt-6 text-red-500 text-[12px]">Nanmo運営からあなたのアカウントは一時利用停止もしくはブロックをされています。詳細はお問い合わせください</p>
      ) : !approved ? (
        <>
          <p className="mt-6 text-zinc-500 text-[12px]">この機能は店舗承認申請を許可された後利用可能です</p>
        </>
      ) : (
        <form className="flex flex-col mt-4 gap-y-4 p-4" onSubmit={addNewProduct}>
          <input 
            type="name" 
            placeholder="商品名" 
            className="border p-2" 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
          <textarea
            placeholder="商品詳細(80文字まで)" 
            className="border p-2"
            maxLength={80}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            type="file" 
            onChange={e => setFiles(e.target.files)} 
          />
          <input 
            type="number" 
            placeholder="在庫数" 
            className="border p-2"
            value={stocks}
            onChange={e => setStocks(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="値段" 
            className="border p-2"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type="number" 
            placeholder="元の値段" 
            className="border p-2"
            value={originalPrice}
            onChange={e => setOriginalPrice(e.target.value)}
          />
          <div className="border p-2">
              <span className="text-zinc-400">受け取り可能日: </span>
              <select
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                required
              >
                <option value="" disabled>選択してください</option>
                <option value="today">今日</option>
                <option value="tomorrow">明日</option>
              </select>
          </div>
          <div className="border p-2">
              <span className="text-zinc-400">受け取り可能開始時間: </span>
              <select
                value={pickupTimeStart}
                onChange={e => setPickupTimeStart(e.target.value)}
                required
              >
                <option value="" disabled>選択してください</option>
                {Array.from({length: 24}, (_, i) => i).map(i => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{i}:00</option>
                ))}
              </select>
          </div>
          <div className="border p-2">
              <span className="text-zinc-400">受け取り可能締切時間: </span>
              <select
                value={pickupTimeEnd}
                onChange={e => setPickupTimeEnd(e.target.value)}
                required
              >
                <option value="" disabled>選択してください</option>
                {Array.from({length: 24}, (_, i) => i).map(i => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{i}:00</option>
                ))}
              </select>
          </div>
          <Button>追加</Button>
        </form>
      )}

    </div>
  )
}

export default AddProduct
