import React from "react";
// import { CiStar } from "react-icons/ci";
import { Product } from '../../../Types/types';

interface Props {
  product: Product;
}

const Store: React.FC<Props> = ({ product }) => {
  return (
    <div className='bg-white p-4 border shadow-lg h-[280px] w-[250px] hover:scale-110 duration-300 overflow-hidden rounded-lg break-words flex flex-col justify-between'>
      <div>
        <div className='flex items-center gap-4'>
          <div>
            <img 
              src={"/images/logo.png"}
              alt={"ロゴ画像"}
              width={60}
              height={60}
              className='object-fit w-[60px] h-[60px] rounded-full'
            />
          </div>
          <div>
            <h1 className='font-bold'>{product.store.storeName}</h1>
            <p className='text-[6px]'>{product.store.address}</p>
            <p className='text-[6px] -mt-2'>{product.store.detailedAddress}</p>
          </div>
        </div>

        <div className='flex flex-col gap-y-[4px]'>
          <p>{product.name}</p>
          <span className='text-[6px]'>残り : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>{product.stocks}</span>個</span>
          {/* optional */}
          {/* <span className="text-[6px]">ジャンル : <span className="border border-green-700 px-2 py-1 rounded-md">飲食店</span></span> */}
          <span className='text-[6px]'>受取可能時間 : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>{product.pickupDate}</span>{product.pickupTime.start} - {product.pickupTime.end}</span>
        </div>
      </div>

      <div className='flex justify-end items-center'>
        {/* optional */}
        {/* <p className='text-[6px] flex items-center gap-x-1'><CiStar size={20}/>3.8 (120)</p> */}
        <p><span className='font-bold text-lg'>¥{product.price}</span><span className='text-[10px] ml-1 line-through p-0.5'>¥{product.originalPrice}</span></p>
      </div>
    </div>
  );
};

export default Store;
