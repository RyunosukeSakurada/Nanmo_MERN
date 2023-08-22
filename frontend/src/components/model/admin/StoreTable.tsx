import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Store {
  _id: string;
  email: string;
  suspended: boolean;
  blocked: boolean;
  approved: boolean;
  createdAt: Date;
}

const StoreTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false); 
  const notifyGetStoresFail = () => toast.error('店舗ユーザーの情報の取得に失敗しました', 
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

useEffect(() => {
  async function fetchStores() {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/user/storeslist', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    
      const result = await res.json();
    
      if (res.status === 200) {
        setStores(result);
      } else {
        console.error(result.message); 
      }
    } catch (error) {
      notifyGetStoresFail()
      console.error("ユーザー情報の取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchStores();
}, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
          <div className="flex justify-center items-center p-[15%]">
            <h1 className="bold text-zinc-500">ローディング中</h1>
          </div>
        ) : stores.length === 0 ? ( 
          <div className="flex justify-center items-center p-[15%]">
            <h1 className="bold text-zinc-500">店舗ユーザーが存在しません</h1>
          </div>
        ) : ( 
          <table className="min-w-full divide-y divide-gray-200 mt-8">
            <thead>
                <tr className="text-center">
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">承認</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center text-[12px]">
              {stores.map(store => (
                <tr key={store._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{store._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.suspended.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.blocked.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.approved.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(store.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  )
}

export default StoreTable
