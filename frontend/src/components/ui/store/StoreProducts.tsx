
const StoreProducts = () => {
  return (
    <div className="flex gap-x-4 shadow-lg p-4">
      <img 
        src="../../../../public/images/logo.png"
        className="w-[100px] h-[100px] rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between">
            <p>商品名</p>
            <div className="flex gap-x-2">
              <span className="text-[6px] text-green-00 cursor-pointer">編集</span>
              <span className="text-[6px] text-red-500 cursor-pointer">削除</span>
            </div>
          </div>
          <p className="text-[6px] text-zinc-500">商品説明</p>
          <span className="text-[6px] text-zinc-500">受け取り時間 : 今日 10:00 - 21:00</span>
        </div>
        
        <div className='flex justify-between items-center'>
          <p className='text-[6px]'>在庫 : 3</p>
          <p><span className='font-bold text-lg'>¥1,500</span><span className='text-[10px] ml-1 line-through p-0.5'>¥4,000</span></p>
        </div>
      </div>
    </div>
  )
}

export default StoreProducts
