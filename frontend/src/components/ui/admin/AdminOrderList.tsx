import { useEffect, useState } from "react";
import { Order } from "../../../Types/types";

const AdminOrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
      const fetchOrders = async () => {
        const response = await fetch('http://localhost:4000/api/order/getAllOrders');
        const data = await response.json();
        console.log(data);
        
        setOrders(data);
      }
  
      fetchOrders();
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200 mt-8">
        <thead>
            <tr className="text-center text-[8px]">
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">注文ID</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">購入者</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">店舗</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">商品名</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">値段</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">ステータス</th>
                <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">取引日</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center text-[8px]">
            {orders.map(order => (
              <tr className="text-center" key={order._id}>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order._id}</td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order.user ? order.user.email : '-'}</td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order.store ? order.store.storeName : '-'}</td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                  {order.items.map(item => item.product.name)}
                </td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                  {order.items.map(item => item.product.price).join(', ')}
                </td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{order.status}</td>
                <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
    </table>
  )
}

export default AdminOrderList
