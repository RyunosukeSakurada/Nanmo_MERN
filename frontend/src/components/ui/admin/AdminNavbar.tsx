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
      <div className="flex flex-col p-4 lg:p-0">
        <h3 className="bold mb-2 text-[6px] lg:text-sm text-zinc-500">Menu</h3>
        <nav className="flex flex-col gap-y-3">
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('home')} 
          >
            <AiOutlineHome className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">ホーム</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('users')} 
          >
            <AiOutlineUser className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">ユーザー管理</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('contact')} 
          >
            <AiOutlineMail className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">
              お問い合わせ
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('approvedRequestTable')} 
          >
            <AiOutlineCheckSquare className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">
              店舗承認申請
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('order')} 
          >
            <BiTransfer className="mr-3 lg:mr-1 icon" />
            <span className="text-sm lg:text-md hover:text-zinc-500">取引履歴</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('addAdmin')} 
          >
            <AiOutlineKey className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">Admin追加</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('faq')}
          >
            <AiOutlineQuestionCircle className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">FAQ</span>
          </li>
          {/* optional function */}
          {/* <li className="flex items-center cursor-pointer">
            <RiCoupon2Line size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">クーポン</span>
          </li> */}
          <Link to="/nanmo">
            <li className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0">
              <RiFileList2Line  className="mr-3 lg:mr-1 icon" />
              <span className="text-sm lg:text-md hover:text-zinc-500">ストア</span>
            </li>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
