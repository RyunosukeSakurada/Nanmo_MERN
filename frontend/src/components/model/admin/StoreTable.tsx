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
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [targetStoreId, setTargetStoreId] = useState<string | null>(null);
  const [isEditingOpen,setIsEditingOpen] = useState(false);
  const [editingStoreEmail, setEditingStoreEmail] = useState<string | null>(null);
  const [editSuspended, setEditSuspended] = useState(false);
  const [editBlocked, setEditBlocked] = useState(false);


  //toastify
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

  const deleteStoreSuccess = () => toast.success('店舗の削除に成功しました', 
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

  const deleteStorefailed = () => toast.error('店舗の削除に失敗しました', 
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

  const ChangeStoreStatusSuccess = () => toast.success('ステータスの変更に成功しました', 
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

  const ChangeStoreStatusfailed = () => toast.error('ステータスの変更に失敗しました', 
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
        console.error("店舗ユーザー情報の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  // 店舗削除機能
  const deleteStore = async (id: string) => { 
    try {
      const res = await fetch(`http://localhost:4000/api/user/deletestore/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (res.status === 200) {
        deleteStoreSuccess()
        setStores(prevStores => prevStores.filter(store => store._id !== id));
      } else {
        const result = await res.json();
        console.error(result.message);
        deleteStorefailed()
      }
    } catch (error) {
      console.error("店舗の削除に失敗しました:", error);
      deleteStorefailed()
    }
  }

  const handleDeleteRequest = (storeId: string) => {
    setTargetStoreId(storeId);
    setIsDeleteConfirmationOpen(true);
  }

  const handleDeleteConfirmation = async () => {
    if (targetStoreId) {
      await deleteStore(targetStoreId);
    }
    setIsDeleteConfirmationOpen(false);
  }

  const handleEditRequest = (storeId: string, email: string, suspended: boolean, blocked: boolean) => {
    setTargetStoreId(storeId);
    setEditingStoreEmail(email);
    setEditSuspended(suspended);
    setEditBlocked(blocked);
    setIsEditingOpen(true);
  }

  const handleUpdateStoreStatus = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/updatestorestatus/${targetStoreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suspended: editSuspended,
          blocked: editBlocked
        })
      });

      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }

      // ユーザーリストを更新
      setStores(prevStores => prevStores.map(store => store._id === targetStoreId ? data : store));
      setIsEditingOpen(false);
      ChangeStoreStatusSuccess()
    } catch (error) {
      console.error("店舗ユーザー情報の更新に失敗しました:", error);
      ChangeStoreStatusfailed()
    }
  }


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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-8">
            <thead>
                <tr className="text-center">
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">承認</th>
                    <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center text-[12px]">
              {stores.map(store => (
                <tr key={store._id}>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{store._id}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{store.email}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{store.suspended.toString()}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{store.blocked.toString()}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{store.approved.toString()}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs">{new Date(store.createdAt).toLocaleDateString()}</td>
                  <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">
                    <button onClick={() => handleEditRequest(store._id,store.email,store.suspended,store.blocked)} className="text-green-500">編集</button>
                  </td>
                  <td className="px-12 md:px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDeleteRequest(store._id)} className="text-red-500">削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[300px] md:w-[400px] break-words">
            <h3 className="mb-4 text-center">本当にこの店舗を削除しますか？</h3>
            <div className="text-center">
              <button onClick={handleDeleteConfirmation} className="mr-4 bg-red-500 text-white px-4 py-2 rounded">削除</button>
              <button onClick={() => setIsDeleteConfirmationOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">キャンセル</button>
            </div>
          </div>
        </div>
      )}
      {isEditingOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[350px] mdw-[500px] break-words">
                <h3 className="mb-4 text-center">店舗ユーザーのステータスを更新</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mt-8">
                      <thead>
                          <tr className="text-center text-[8px]">
                              <th className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">メールアドレス</th>
                              <th className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">一時利用停止</th>
                              <th className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">ブロック</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center text-[8px]">
                          <tr className="text-center">
                              <td className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">{editingStoreEmail}</td>
                              <td className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">
                                  <select value={editSuspended.toString()} onChange={(e) => setEditSuspended(e.target.value === "true")}>
                                      <option value="true">true</option>
                                      <option value="false">false</option>
                                  </select>
                              </td>
                              <td className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">
                                  <select value={editBlocked.toString()} onChange={(e) => setEditBlocked(e.target.value === "true")}>
                                      <option value="true">true</option>
                                      <option value="false">false</option>
                                  </select>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleUpdateStoreStatus}>
                        確定
                    </button>
                    <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsEditingOpen(false)}>
                        戻る
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}

export default StoreTable;
