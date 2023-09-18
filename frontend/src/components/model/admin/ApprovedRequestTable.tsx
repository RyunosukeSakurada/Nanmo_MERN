import { useState, useEffect } from 'react';
import { Store } from '../../../Types/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ApprovedRequestTable = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false); 
  const [isApproveConfirmOpen, setIsApproveConfirmOpen] = useState(false);
  const [isDeclineConfirmOpen, setIsDeclineConfirmOpen] = useState(false);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);


  //Toastify
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

  //承認申請をしている店舗ユーザーの一覧を取得
  useEffect(() => {
    async function fetchStores() {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/storeslist`);
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


  //承認申請を許可する
  const handleApprove = async (storeId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/approveStore/${storeId}`, {
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


  //承認申請を却下する
  const handleDecline = async (storeId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/declineStore/${storeId}`, {
        method: 'PUT'
      });
  
      if (!response.ok) {
        throw new Error('店舗の却下に失敗しました。');
      }
  
      const updatedStore = await response.json();
  
      // 却下された店舗をリストから削除
      setStores(stores => stores.filter(store => store._id !== updatedStore._id));
  
      changeStatusSuccess();
    } catch (error) {
      console.error(error);
      changeStatusfailed();
    }
  };

  //承認するときのpop
  const showApprovalConfirmation = (storeId: string) => {
    setCurrentStoreId(storeId);
    setIsApproveConfirmOpen(true);
  };

  //却下するときのpop
  const showDeclineConfirmation = (storeId: string) => {
    setCurrentStoreId(storeId);
    setIsDeclineConfirmOpen(true);
  };


  const handleConfirmApprove = async () => {
    if(currentStoreId) {
      handleApprove(currentStoreId);
    }
    setIsApproveConfirmOpen(false);
  };

  const handleConfirmDecline = async () => {
    if(currentStoreId) {
      handleDecline(currentStoreId);
    }
    setIsDeclineConfirmOpen(false);
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-8">
            <thead>
              <tr className="text-center">
                <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">店舗名</th>
                <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">住所</th>
                <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
                <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
              </tr>
            </thead>
            <tbody className="divide-ydivide-gray-200 text-center text-[12px]">
              {stores.map(store => (
                <tr key={store._id}>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">{store.storeName}</td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">{store.address} {store.detailedAddress}</td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">{store.email}</td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">{store.suspended.toString()}</td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">{store.blocked.toString()}</td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">
                    <button className="text-green-500" onClick={() => showApprovalConfirmation(store._id)}>許可</button>
                  </td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">
                    <button onClick={() => showDeclineConfirmation(store._id)}  className="text-red-500 hover:text-red-700">却下</button>
                  </td>
                </tr>
              ))}
                  {isApproveConfirmOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[300px] md:w-[400px] break-words">
                        <h3 className="mb-4 text-center">本当に許可しますか？</h3>
                        <div className="flex justify-center items-center">
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleConfirmApprove}>
                            許可する
                          </button>
                          <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsApproveConfirmOpen(false)}>
                            戻る
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isDeclineConfirmOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[300px] md:w-[400px] break-words">
                        <h3 className="mb-4 text-center">本当に却下しますか？</h3>
                        <div className="flex justify-center items-center">
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleConfirmDecline}>
                            却下する
                          </button>
                          <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsDeclineConfirmOpen(false)}>
                            戻る
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApprovedRequestTable;
