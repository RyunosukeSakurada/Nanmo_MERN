import { useEffect, useState } from "react";
import { Order } from "../../../Types/types";

interface storeProps{
  storeId? : string
}

const StoreHome:React.FC<storeProps> = ({storeId}) => {
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [storeCount, setStoreCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!storeId) {
        console.error("storeId is not provided");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/getOrdersByStore/${storeId}`);
        const orders = await response.json(); 

        // 総取引数の計算
        setOrderCount(orders.length);
        
        // 総売上金額の計算
        let totalAmount = 0;
        orders.forEach((order: Order) => {
          order.items.forEach(item => {
            totalAmount += item.product.price * item.quantity;
          });
        });
        setStoreCount(totalAmount);

      } catch (error) {
        console.error("Error fetching store orders:", error);
      }
    };

    fetchOrders();
  }, [storeId]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-y-8">
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
              <p className="text-3xl">{storeCount}<span className="text-[8px] ml-2">円</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreHome
