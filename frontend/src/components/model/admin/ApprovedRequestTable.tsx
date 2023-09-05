import { useState, useEffect } from 'react';
import { Store } from '../../../Types/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ApprovedRequestTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false); 

  const changeStatusSuccess = () => toast.success('変更に成功しました', 
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

const changeStatusfailed = () => toast.error('変更に失敗しました', 
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
        const response = await fetch('http://localhost:4000/api/user/storeslist');
        if (!response.ok) {
          throw new Error('店舗の情報の取得に失敗しました。');
        }
        
        const data = await response.json();
        const requestedStores = data.filter((store: Store) => store.requested && !store.approved);
        setStores(requestedStores);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  const handleApprove = async (storeId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/approveStore/${storeId}`, {
        method: 'PUT'
      });
  
      if (!response.ok) {
        throw new Error('店舗の承認に失敗しました。');
      }
  
      const updatedStore = await response.json();
  
      // この店舗をリストからフィルタリングアウトして削除します
      setStores(stores => stores.filter(store => store._id !== updatedStore._id));
      
      changeStatusSuccess()
    } catch (error) {
      console.error(error);
      changeStatusfailed();
    }
  };
  

  return (
    <div className="bg-white p-4 rounded-lg">
      <ToastContainer />
      <h3 className="bold">店舗承認申請</h3>

      {loading ? (
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">ローディング中</h1>
        </div>
      ) : stores.length === 0 ? ( 
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">承認申請をしている店舗ユーザーが存在しません</h1>
        </div>
      ) : ( 
        <table className="min-w-full divide-y divide-gray-200 mt-8">
          <thead>
            <tr className="text-center">
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">店舗名</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">住所</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
            </tr>
          </thead>
          <tbody className="divide-ydivide-gray-200 text-center text-[12px]">
            {stores.map(store => (
              <tr key={store._id}>
                <td className="px-6 py-4 whitespace-nowrap">{store._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.storeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.address} {store.detailedAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.suspended.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.blocked.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-green-500" onClick={() => handleApprove(store._id)}>許可</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-red-500">却下</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApprovedRequestTable;
