import {CiStar} from "react-icons/ci"

const Store = () => {
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
            <h1 className='font-bold'>XXXXXXX</h1>
            <p className='text-[6px]'>XX町X-XX-XX</p>
            <p className='text-[6px] -mt-2'>XXXXXXXXXXXX</p>
          </div>
        </div>

        <div className='flex flex-col gap-y-[4px]'>
          <p>XXXXXXXXXXXXXXXXXX</p>
          <span className='text-[6px]'>残り : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>2</span>個</span>
          <span className="text-[6px]">ジャンル : <span className="border border-green-700 px-2 py-1 rounded-md">飲食店</span></span>
          <span className='text-[6px]'>受取可能時間 : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>今日</span>9:00 - 19:00</span>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <p className='text-[6px] flex items-center gap-x-1'><CiStar size={20}/>3.8 (120)</p>
        <p><span className='font-bold text-lg'>¥1,500</span><span className='text-[10px] ml-1 line-through p-0.5'>¥4,000</span></p>
      </div>
    </div>
  )
}

export default Store
