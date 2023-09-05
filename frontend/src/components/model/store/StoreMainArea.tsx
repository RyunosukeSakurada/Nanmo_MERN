import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import {AiOutlineCalendar} from "react-icons/ai"
import { TabSelectionForStore } from "../../../Types/types";
import ManageProducts from "./ManageProducts";
import StoreApprovalRequest from "./StoreApprovalRequest";


interface MainAreaProps {
  selectedTab: TabSelectionForStore;
}

const StoreMainArea: React.FC<MainAreaProps>  = ({ selectedTab }) => {
    // 現在の日付を取得
    const currentDate = new Date();
    // 月の名前の配列を作成
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // 日付をフォーマット
    const formattedDate = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`;
  
    const {userInfo, setUserInfo} = useContext(UserContext)
    const email = userInfo?.email
    const storeId = userInfo?.id;
    const approved = userInfo?.approved;

      
    useEffect(() => {
      fetch("http://localhost:4000/api/auth/profile",{
        credentials:"include",
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
        })
      })
    },[setUserInfo])

  return (
    <div className="">
      <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1>Dashboard</h1>
          <div className="bg-slate-100 py-2 px-4 rounded-lg flex items-center gap-x-2 ml-6">
            <AiOutlineCalendar size={20}/>
            <span className="text-sm">{formattedDate}</span>
          </div>
        </div>
        <div>
          <p className="text-sm">{email}</p>
        </div>
      </div>

      <div>
        {selectedTab === 'products' && <ManageProducts approved={approved}/>}
        {selectedTab === 'approvalRequest' && <StoreApprovalRequest storeId={storeId} approved={approved} />}
      </div>
    </div>
  )
}

export default StoreMainArea
