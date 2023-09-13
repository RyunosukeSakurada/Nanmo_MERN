import {AiOutlineUser,AiOutlineMail,AiOutlineCheckSquare,AiOutlineKey,AiOutlineQuestionCircle,AiOutlineHome} from "react-icons/ai"
// import {RiCoupon2Line} from "react-icons/ri"
import { TabSelection } from "../../../Types/types";
import { Link } from "react-router-dom";
import {RiFileList2Line} from "react-icons/ri"
import {BiTransfer} from "react-icons/bi"



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
            onClick={() => onTabSelect('home')} 
          >
            <AiOutlineHome size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">ホーム</span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('users')} 
          >
            <AiOutlineUser size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">ユーザー管理</span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('contact')} 
          >
            <AiOutlineMail size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">
              お問い合わせ
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('approvedRequestTable')} 
          >
            <AiOutlineCheckSquare size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">
              店舗承認申請
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('order')} 
          >
            <BiTransfer size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">取引履歴</span>
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
          {/* optional function */}
          {/* <li className="flex items-center cursor-pointer">
            <RiCoupon2Line size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">クーポン</span>
          </li> */}
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
