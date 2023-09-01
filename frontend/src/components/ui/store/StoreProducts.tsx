import { Product } from "../../../Types/types";

interface StoreProductsProps {
  product: Product;
}


const StoreProducts: React.FC<StoreProductsProps> = ({ product }) => {
  return (
    <div className="flex gap-x-4 shadow-lg p-4">
      <img 
        src={`http://localhost:4000/${product.productImage}`}
        className="w-[100px] h-[100px] rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between">
            <p>{product.name}</p>
            <div className="flex gap-x-2">
              <span className="text-[6px] text-green-00 cursor-pointer">編集</span>
              <span className="text-[6px] text-red-500 cursor-pointer">削除</span>
            </div>
          </div>
          <p className="text-[6px] text-zinc-500">{product.description}</p>
          <span className="text-[6px] text-zinc-500">受け取り時間 : {product.pickupDate} {product.pickupTime.start} - {product.pickupTime.end}</span>
        </div>
        
        <div className='flex justify-between items-center'>
          <p className='text-[6px]'>在庫 : {product.stocks}</p>
          <p><span className='font-bold text-lg'>¥{product.price}</span><span className='text-[10px] ml-1 line-through p-0.5'>¥{product.originalPrice}</span></p>
        </div>
      </div>
    </div>
  )
}

export default StoreProducts

