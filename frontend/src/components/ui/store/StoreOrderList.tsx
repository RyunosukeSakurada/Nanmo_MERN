import { useEffect, useState } from "react";
import { Order } from "../../../Types/types";

interface storeProps{
  storeId? : string
}

const StoreOrderList:React.FC<storeProps> = ({storeId}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/getOrdersByStore/${storeId}`);
      const data = await response.json();
      console.log(data);
      
      setOrders(data);
    }

    fetchOrders();
  }, [storeId]);

  return (
    orders.length === 0 ? (
      <div className="flex items-center justify-center">
        <p className="text-zinc-500 my-10">まだありません</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 mt-8">
            <thead>
                <tr className="text-center text-[8px]">
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">注文ID</th>
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">購入者</th>
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">商品名</th>
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">値段</th>
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">ステータス</th>
                    <th className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">取引日</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center text-[8px]">
              {orders.map(order => (
                <tr key={order._id} className="text-center">
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order._id}</td>
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order.user ? order.user.email : '-'}</td>
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                    {order.items.map(item => item.product.name)}
                  </td>
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                    {order.items.map(item => `${item.product.price * item.quantity}円`).join(', ')}
                  </td>
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order.status}</td>
                  <td className="px-12 md:px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    )
  )
}

export default StoreOrderList
