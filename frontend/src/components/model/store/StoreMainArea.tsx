import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import {AiOutlineCalendar} from "react-icons/ai"
import { TabSelectionForStore } from "../../../Types/types";
import ManageProducts from "./ManageProducts";
import StoreApprovalRequest from "./StoreApprovalRequest";
import StoreInformation from "./StoreInformation";
import StoreOrder from "./StoreOrder";
import StoreHome from "./StoreHome";


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
    const requestDeclined = userInfo?.requestDeclined;

    const address = userInfo?.address;
    const detailedAddress = userInfo?.detailedAddress;
    const storeName = userInfo?.storeName;
    const postalCode = userInfo?.postalCode;

      
    useEffect(() => {
      fetch("http://localhost:4000/api/auth/profile",{
        credentials:"include",
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
          console.log(userInfo);
        })
      })
    },[setUserInfo])


  return (
    <div className="-mt-15 lg:mt-0">
      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-[12px] md:text-base">Dashboard</h1>
          <div className="bg-slate-100 py-1 md:py-2 px-2 md:px-4 rounded-lg flex items-center gap-x-2 ml-1 md:ml-6">
            <AiOutlineCalendar className="icon" />
            <span className="text-[8px] md:text-sm">{formattedDate}</span>
          </div>
        </div>
        <div>
          <p className="text-[8px] md:text-sm">{email}</p>
        </div>
      </div>

      <div>
        {selectedTab === 'home' && <StoreHome storeId={storeId}/>}
        {selectedTab === 'products' && <ManageProducts approved={approved} />}
        {selectedTab === 'approvalRequest' && <StoreApprovalRequest storeId={storeId} approved={approved} requestDeclined={requestDeclined}/>}
        {selectedTab === 'storeInformation' && <StoreInformation storeId={storeId} email={email} address={address} detailedAddress={detailedAddress} storeName={storeName} postalCode={postalCode} />}
        {selectedTab === 'order' && <StoreOrder storeId={storeId}/>}
      </div>
    </div>
  )
}

export default StoreMainArea
