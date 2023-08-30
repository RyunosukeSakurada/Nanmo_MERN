import {  useState } from "react";
import MainArea from "../../model/admin/MainArea"
import Sidebar from "../../model/admin/Sidebar"
import { TabSelection } from "../../../Types/types";


const AdminDashBoard = () => {
  const [selectedTab, setSelectedTab] = useState<TabSelection>('users');

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-[1] p-4">
        <Sidebar onTabSelect={setSelectedTab}  />
      </div>
      <div className="flex-[6] p-4">
        <MainArea selectedTab={selectedTab} />
      </div>
    </div>
  )
}

export default AdminDashBoard
