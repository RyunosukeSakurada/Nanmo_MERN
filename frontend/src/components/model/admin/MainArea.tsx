import { TabSelection } from "../../../Types/types";
import AddAdmin from "./AddAdmin";
import UserList from "./UserList"
import {AiOutlineCalendar} from "react-icons/ai"

interface MainAreaProps {
  selectedTab: TabSelection;
}

const MainArea: React.FC<MainAreaProps>  = ({ selectedTab }) => {
  // 現在の日付を取得
  const currentDate = new Date();
  // 月の名前の配列を作成
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // 日付をフォーマット
  const formattedDate = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`;

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
          <p className="text-sm">testuser1@gmail.com</p>
        </div>
      </div>

      <div>
        {selectedTab === 'users' && <UserList />}
        {selectedTab === 'addAdmin' && <AddAdmin />}
      </div>
    </div>
  )
}

export default MainArea
