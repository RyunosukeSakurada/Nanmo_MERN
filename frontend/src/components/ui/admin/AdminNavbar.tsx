import {AiOutlineUser,AiOutlineMail,AiOutlineCheckSquare,AiOutlineKey,AiOutlineQuestionCircle} from "react-icons/ai"
import {RiCoupon2Line} from "react-icons/ri"
import { TabSelection } from "../../../Types/types";
import { Link } from "react-router-dom";
import {RiFileList2Line} from "react-icons/ri"


interface NavbarProps {
  onTabSelect: (tab: TabSelection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTabSelect }) => {

  return (
    <div className="mb-6">
      <div>
        <h3 className="bold mb-2 text-sm text-zinc-500">Menu</h3>
        <nav className="flex flex-col gap-y-3">
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('users')} 
          >
            <AiOutlineUser size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">ユーザー管理</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <AiOutlineMail size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500 relative">
              メッセージ
              <span className="w-[10px] h-[10px] bg-red-500 rounded-full absolute -left-5"></span>
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('approvedRequestTable')} 
          >
            <AiOutlineCheckSquare size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500 relative">
              店舗承認申請
              <span className="w-[10px] h-[10px] bg-red-500 rounded-full absolute -left-5"></span>
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('addAdmin')} 
          >
            <AiOutlineKey size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">Admin追加</span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('faq')}
          >
            <AiOutlineQuestionCircle size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">FAQ</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <RiCoupon2Line size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">クーポン</span>
          </li>
          <Link to="/nanmo">
            <li className="flex items-center cursor-pointer">
              <RiFileList2Line size={20} className="mr-3" />
              <span className="text-md hover:text-zinc-500">ストア</span>
            </li>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
