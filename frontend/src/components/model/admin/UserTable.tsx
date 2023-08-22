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
                </tr>
              ))}
            </tbody>
        </table>
      )}
    </>
  )
}

export default UserTable
