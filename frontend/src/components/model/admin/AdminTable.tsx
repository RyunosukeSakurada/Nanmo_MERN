import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface Admin {
  _id: string;
  email: string;
  suspended: boolean;
  blocked: boolean;
  isAdmin:boolean;
  createdAt: Date;
}

const AdminTable: React.FC<{ newAdmin: Admin | null }> = ({ newAdmin }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false); 
  const notifyGetAdminsFail = () => toast.error('Adminの情報の取得に失敗しました', 
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
  async function fetchAdmins() {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/user/adminusers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    
      const result = await res.json();
    
      if (res.status === 200) {
        setAdmins(result);
      } else {
        console.error(result.message); 
      }
    } catch (error) {
      notifyGetAdminsFail()
      console.error("admin情報の取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  }
  
  fetchAdmins();
  if (newAdmin) {
    setAdmins(prevAdmins => [newAdmin, ...prevAdmins]);
  }
}, [newAdmin]);

  return (
    <>
    <ToastContainer />
    {loading ? (
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">ローディング中</h1>
        </div>
      ) : admins.length === 0 ? ( 
        <div className="flex justify-center items-center p-[15%]">
          <h1 className="bold text-zinc-500">Adminが存在しません</h1>
        </div>
      ) : ( 
        <table className="min-w-full divide-y divide-gray-200 mt-8">
          <thead>
              <tr className="text-center">
                  <th className="w-1/3 px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">id</th>
                  <th className="w-1/3 px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">メールアドレス</th>
                  <th className="w-1/3 px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
              </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center text-[12px]">
            {admins.map(admin => (
              <tr key={admin._id}>
                <td className="w-1/3 px-6 py-4 whitespace-nowrap">{admin._id}</td>
                <td className="w-1/3 px-6 py-4 whitespace-nowrap">{admin.email}</td>
                <td className="w-1/3 px-6 py-4 whitespace-nowrap">{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  </>
  )
}

export default AdminTable
