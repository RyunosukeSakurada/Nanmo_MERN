import { useEffect, useState } from "react";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(null);
  const [storeCount, setStoreCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 総利用者数を取得
        const userRes = await fetch('http://localhost:4000/api/auth/userscount');
        const userData = await userRes.json();
        if (userRes.ok) {
          setUserCount(userData.count);
        } else {
          console.error('APIからの利用者数の取得に失敗:', userData.message);
        }

        // 総店舗数を取得
        const storeRes = await fetch('http://localhost:4000/api/auth/storescount');
        const storeData = await storeRes.json();
        if (storeRes.ok) {
          setStoreCount(storeData.count);
        } else {
          console.error('APIからの店舗数の取得に失敗:', storeData.message);
        }

        // 取引数を取得
        const orderRes = await fetch('http://localhost:4000/api/auth/orderscount');
        const orderData = await orderRes.json();
        if (orderRes.ok) {
          setOrderCount(orderData.count);
        } else {
          console.error('APIからの店舗数の取得に失敗:', orderData.message);
        }

        const totalRes = await fetch('http://localhost:4000/api/auth/totalorderprice');
        const totalData = await totalRes.json();
        if (totalRes.ok) {
          setTotalOrderPrice(totalData.total);
        } else {
          console.error('APIからの取引金額の取得に失敗:', totalData.message);
        }

      } catch (error) {
        console.error('APIからデータの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-x-8">
          <div className="shadow w-full md:w-1/2 p-4">
            <p className="text-[12px] text-zinc-500">総利用者数</p>
            <div className="my-8 text-center">
              <p className="text-3xl">{userCount}<span className="text-[8px] ml-2">人</span></p>
            </div>
          </div>
          <div className="shadow w-full md:w-1/2 p-4">
            <p className="text-[12px] text-zinc-500">総店舗数</p>
            <div className="my-8 text-center">
              <p className="text-3xl">{storeCount}<span className="text-[8px] ml-2">店舗</span></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-x-8">
          <div className="shadow w-full md:w-1/2 p-4">
            <p className="text-[12px] text-zinc-500">総取引数</p>
            <div className="my-8 text-center">
              <p className="text-3xl">{orderCount}<span className="text-[8px] ml-2">回</span></p>
            </div>
          </div>
          <div className="shadow w-full md:w-1/2 p-4">
            <p className="text-[12px] text-zinc-500">総売上金額</p>
            <div className="my-8 text-center">
              <p className="text-3xl">{totalOrderPrice}<span className="text-[8px] ml-2">円</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
