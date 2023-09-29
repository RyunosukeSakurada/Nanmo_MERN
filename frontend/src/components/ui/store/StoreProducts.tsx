import { useState } from "react";
import { Product } from "../../../Types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface StoreProductsProps {
  product: Product;
  onDeleted: () => void;
}


const StoreProducts: React.FC<StoreProductsProps> = ({ product,onDeleted }) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const deleteProductSuccess = () => toast.success('商品の削除に成功しました', 
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

const deleteProductfailed = () => toast.error('商品の削除に失敗しました', 
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

const deleteProduct = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/deleteProduct/${product._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (data.message) {
      deleteProductSuccess();
      onDeleted(); 
    }
  } catch (error) {
    deleteProductfailed();
    console.error(error);
  }
};

  const showDeleteConfirmation = () => {
    setIsDeleteConfirmOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    await deleteProduct();
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="flex gap-x-4 shadow-lg p-4">
      <ToastContainer />
      <img 
        src={`${import.meta.env.VITE_API_BASE_URL}/${product.productImage}`}
        className="w-[100px] h-[100px] rounded-lg object-cover"
        alt="商品画像"
      />
      <div className="flex flex-col justify-between w-full overflow-hidden">
        <div>
          <div className="flex justify-between">
            <p className="text-[12px] sm:text-base">{product.name}</p>
            <div className="flex gap-x-2">
              <span className="text-[6px]">{product.stocks === 0 ? '売り切れ' : '販売中'}</span>
              {product.stocks === 0 ? (
                <></>
              ) : (
                <span className="text-[6px] text-red-500 cursor-pointer"  onClick={showDeleteConfirmation}>削除</span>
              )}
            </div>
          </div>
          <p className="text-[6px] text-zinc-500 break-words whitespace-normal">{product.description}</p>
          <p className="flex flex-col sm:flex-row text-[6px] text-zinc-500">受け取り時間 : <span className="-mt-3 sm:ml-1 sm:mt-0">{product.pickupDate} {product.pickupTime.start} - {product.pickupTime.end}</span></p>
        </div>
        
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <p className='text-[6px]'>在庫 : {product.stocks}</p>
          <p><span className='font-bold text-[12px] md:text-lg'>¥{product.price}</span><span className='text-[8px] md:text-[10px] ml-1 line-through p-0.5'>¥{product.originalPrice}</span></p>
        </div>
      </div>
      {isDeleteConfirmOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[400px] break-words">
            <h3 className="mb-4 text-center">本当に削除しますか？</h3>
            <div className="flex justify-center items-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleConfirmDelete}>
                削除する
              </button>
              <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsDeleteConfirmOpen(false)}>
                戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreProducts

