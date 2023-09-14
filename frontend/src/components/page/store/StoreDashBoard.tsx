import { useState } from "react";
import MainAreaForStore from "../../model/store/StoreMainArea"
import SidebarForStore from "../../model/store/StoreSidebar"
import { TabSelectionForStore } from "../../../Types/types";


const StoreDashBoard = () => {
  const [selectedTab, setSelectedTab] = useState<TabSelectionForStore>('home');

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-[1] p-4">
        <SidebarForStore onTabSelect={setSelectedTab}  />
      </div>
      <div className="flex-[6] p-4">
        <MainAreaForStore selectedTab={selectedTab} />
      </div>
    </div>
  )
}

export default StoreDashBoard
