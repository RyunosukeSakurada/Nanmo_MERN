import { Link } from "react-router-dom"
import Navbar from "../../ui/admin/AdminNavbar"
import { TabSelection } from "../../../Types/types";
import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai"
import { useState } from "react";


interface SidebarProps {
  onTabSelect: (tab: TabSelection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({onTabSelect}) => {
  const [isOpen, setIsOpen] = useState(false)

  const humbergerToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-white py-4 px-6 shadow rounded-lg flex flex-row lg:flex-col items-center justify-between relative">
      <Link to="/">
        <h1 className="text-[12px] lg:text-xl bold md:text-center lg:mb-10">Nanmo <span className="text-green-700">.</span></h1>
      </Link>
      <div className="hidden lg:block">
        <Navbar onTabSelect={onTabSelect} />
      </div>
      {/* ハンバーガーメニュー */}
      <div className="lg:hidden" onClick={humbergerToggle}>
        {isOpen ? (<AiOutlineClose />) : (<AiOutlineMenu />)}
      </div>

      {isOpen && (
        <div className="absolute lg:hidden top-[3.6rem] right-0 w-full bg-slate-50 z-20">
          <Navbar onTabSelect={onTabSelect}/>
        </div>
      )}
    </div>
  )
}

export default Sidebar
