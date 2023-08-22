import MainArea from "../../model/admin/MainArea"
import Sidebar from "../../model/admin/Sidebar"

const AdminDashBoard = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-[1] p-4">
        <Sidebar />
      </div>
      <div className="flex-[6] p-4">
        <MainArea />
      </div>
    </div>
  )
}

export default AdminDashBoard
