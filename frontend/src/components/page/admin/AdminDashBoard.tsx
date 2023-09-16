import {  useState } from "react";
import AdminMainArea from "../../model/admin/AdminMainArea"
import Sidebar from "../../model/admin/AdminSidebar"
import { TabSelection } from "../../../Types/types";


const AdminDashBoard = () => {
  const [selectedTab, setSelectedTab] = useState<TabSelection>('home');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-[1] p-4">
        <Sidebar onTabSelect={setSelectedTab}  />
      </div>
      <div className="flex-[6] p-4">
        <AdminMainArea selectedTab={selectedTab} />
      </div>
    </div>
  )
}

export default AdminDashBoard
