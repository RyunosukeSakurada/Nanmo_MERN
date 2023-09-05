import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  _id: string;
  email: string;
  suspended: boolean;
  blocked: boolean;
  createdAt: Date;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false); 
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const [isEditingOpen,setIsEditingOpen] = useState(false);
  const [editingUserEmail, setEditingUserEmail] = useState<string | null>(null);
  const [editSuspended, setEditSuspended] = useState(false);
  const [editBlocked, setEditBlocked] = useState(false);

  //toastify
  const notifyGetUsersFail = () => toast.error('ユーザーの情報の取得に失敗しました', 
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

  const deleteUserSuccess = () => toast.success('ユーザーの削除に成功しました', 
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

  const deleteUserfailed = () => toast.error('ユーザーの削除に失敗しました', 
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

  const ChangeUserStatusSuccess = () => toast.success('ステータスの変更に成功しました', 
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

  const ChangeUserStatusfailed = () => toast.error('ステータスの変更に失敗しました', 
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
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/api/user/userslist', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
      
        const result = await res.json();
      
        if (res.status === 200) {
          setUsers(result);
        } else {
          console.error(result.message); 
        }
      } catch (error) {
        notifyGetUsersFail()
        console.error("ユーザー情報の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  
  // ユーザー削除機能
  const deleteUser = async (id: string) => { 
    try {
      const res = await fetch(`http://localhost:4000/api/user/deleteuser/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (res.status === 200) {
        deleteUserSuccess()
        // ローカルのstateからも削除
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        const result = await res.json();
        console.error(result.message);
        deleteUserfailed()
      }
    } catch (error) {
      console.error("ユーザーの削除に失敗しました:", error);
      deleteUserfailed()
    }
  }

  const handleDeleteRequest = (userId: string) => {
    setTargetUserId(userId);
    setIsDeleteConfirmationOpen(true);
  }

  const handleDeleteConfirmation = async () => {
    if (targetUserId) {
      await deleteUser(targetUserId);
    }
    setIsDeleteConfirmationOpen(false);
  }

  
  const handleEditRequest = (userId: string, email: string, suspended: boolean, blocked: boolean) => {
    setTargetUserId(userId);
    setEditingUserEmail(email);
    setEditSuspended(suspended);
    setEditBlocked(blocked);
    setIsEditingOpen(true);
  }

  const handleUpdateUserStatus = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/auth/updateuserstatus/${targetUserId}`, {
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
      setUsers(prevUsers => prevUsers.map(user => user._id === targetUserId ? data : user));
      setIsEditingOpen(false);
      ChangeUserStatusSuccess()
    } catch (error) {
      console.error("ユーザー情報の更新に失敗しました:", error);
      ChangeUserStatusfailed()
    }
  }


  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">ローディング中</h1>
        </div>
      ) : users.length === 0 ? ( 
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">ユーザーが存在しません</h1>
        </div>
      ) : ( 
        <table className="min-w-full divide-y divide-gray-200 mt-8">
            <thead>
                <tr className="text-center">
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">一時利用停止</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">ブロック</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center text-[12px]">
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.suspended.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.blocked.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleEditRequest(user._id,user.email,user.suspended,user.blocked)} className="text-green-500">編集</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDeleteRequest(user._id)} className="text-red-500">削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      )}
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[400px] break-words">
            <h3 className="mb-4 text-center">本当にこのユーザーを削除しますか？</h3>
            <div className="flex justify-center items-center">
              <button className="bg-red-700 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleDeleteConfirmation}>
                削除
              </button>
              <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsDeleteConfirmationOpen(false)}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditingOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[500px] break-words">
                <h3 className="mb-4 text-center">ユーザーのステータスを更新</h3>
                <table className="min-w-full divide-y divide-gray-200 mt-8">
                    <thead>
                        <tr className="text-center text-[8px]">
                            <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">メールアドレス</th>
                            <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">一時利用停止</th>
                            <th className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">ブロック</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-center text-[8px]">
                        <tr className="text-center">
                            <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">{editingUserEmail}</td>
                            <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                                <select value={editSuspended.toString()} onChange={(e) => setEditSuspended(e.target.value === "true")}>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </td>
                            <td className="px-2 py-3 text-xs font-medium tracking-wider text-gray-500">
                                <select value={editBlocked.toString()} onChange={(e) => setEditBlocked(e.target.value === "true")}>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center items-center">
                    <button className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4 mr-2" onClick={handleUpdateUserStatus}>
                        確定
                    </button>
                    <button className="border text-gray-700 px-4 py-2 rounded-lg mt-4 ml-2" onClick={() => setIsEditingOpen(false)}>
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  )
}

export default UserTable
