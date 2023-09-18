import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SuspendedEntity {
  _id: string;
  email: string;
  suspended: boolean;
  blocked: boolean;
  createdAt: Date;
  type: '一般ユーザー' | '店舗ユーザー';
}

const SuspendedTable = () => {
  const [suspendedEntities, setSuspendedEntities] = useState<SuspendedEntity[]>([]);
  const [loading, setLoading] = useState(false); 
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editingEntityEmail, setEditingEntityEmail] = useState<string | null>(null);
  const [editSuspended, setEditSuspended] = useState(false);
  const [editingEntityType, setEditingEntityType] = useState<'一般ユーザー' | '店舗ユーザー'>('一般ユーザー');
  const [refetch, setRefetch] = useState(false);


  //toasity
  const notifyGetSuspendedEntitiesFail = () => toast.error('ユーザーの情報の取得に失敗しました', 
  {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const ChangeEntityStatusSuccess = () => toast.success('ステータスの変更に成功しました', 
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
  const ChangeEntityStatusfailed = () => toast.error('ステータスの変更に失敗しました', 
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
    async function fetchSuspendedEntities() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/suspendedusers`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
    
        const result = await res.json();
    
        if (res.status === 200) {
          setSuspendedEntities(result);
        } else {
          console.error(result.message); 
        }
      } catch (error) {
        notifyGetSuspendedEntitiesFail()
        console.error("ユーザー情報の取得に失敗しました:", error);
      }finally {
        setLoading(false);
      }
    }

    fetchSuspendedEntities();
  }, [refetch]);


  const handleEditRequest = (entityId: string, email: string, suspended: boolean, type: '一般ユーザー' | '店舗ユーザー') => {
    setEditingEntityId(entityId);
    setEditingEntityEmail(email);
    setEditSuspended(suspended);
    setEditingEntityType(type);
    setIsEditingOpen(true);
  }

  const handleUpdateEntityStatus = async () => {
    const endpoint = editingEntityType === '一般ユーザー'
      ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/updateuserstatus/${editingEntityId}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/auth/updatestorestatus/${editingEntityId}`;
    
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suspended: editSuspended,
        })
      });
      
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      
      // エンティティリストを更新
      setRefetch(prev => !prev);
      setSuspendedEntities(prevEntities => prevEntities.map(entity => entity._id === editingEntityId ? data : entity));
      setIsEditingOpen(false);
      ChangeEntityStatusSuccess();
    } catch (error) {
      console.error("エンティティの更新に失敗しました:", error);
      ChangeEntityStatusfailed();
    }
  }

  return (
    <>
      <ToastContainer />
        {loading ? (
          <div className="flex justify-center items-center p-[15%]">
            <h1 className="bold text-zinc-500">ローディング中</h1>
          </div>
        ) : suspendedEntities.length === 0 ? ( 
          <div className="flex justify-center items-center p-[15%]">
            <h1 className="bold text-zinc-500">ユーザーが存在しません</h1>
          </div>
        ) : ( 
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-8">
              <thead>
                  <tr className="text-center">
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ユーザータイプ</th>
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
                      <th className="px-12 md:px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center text-[12px]">
                {suspendedEntities.map(entity => (
                  <tr key={entity._id}>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{entity._id}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{entity.type}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{entity.email}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{entity.suspended.toString()}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{entity.blocked.toString()}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">{new Date(entity.createdAt).toLocaleDateString()}</td>
                    <td className="px-12 md:px-6 py-4 text-[6px] md:text-xs whitespace-nowrap">
                      <button onClick={() => handleEditRequest(entity._id,entity.email,entity.suspended,entity.type)} className="text-green-500">編集</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isEditingOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[300px] md:w-[500px] break-words">
                  <h3 className="mb-4 text-center">ユーザーのステータスを更新</h3>
                  <table className="min-w-full divide-y divide-gray-200 mt-8">
                      <thead>
                          <tr className="text-center text-[8px]">
                              <th className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">メールアドレス</th>
                              <th className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">一時利用停止</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center text-[8px]">
                          <tr className="text-center">
                              <td className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">{editingEntityEmail}</td>
                              <td className="px-2 py-3 text-[8px] md:text-xs font-medium tracking-wider text-gray-500">
                                  <select value={editSuspended.toString()} onChange={(e) => setEditSuspended(e.target.value === "true")}>
                                      <option value="true">true</option>
                                      <option value="false">false</option>
                                  </select>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div className="flex justify-center items-center">
                      <button className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleUpdateEntityStatus}>
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
  )
}

export default SuspendedTable;
