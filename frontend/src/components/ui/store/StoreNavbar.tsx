import React from 'react'
import { TabSelectionForStore } from "../../../Types/types";
import { AiOutlineMail,AiOutlineCheckSquare} from "react-icons/ai"
import {BiTransfer} from "react-icons/bi"
import {BsBoxSeam} from "react-icons/bs"
import {RiFileList2Line} from "react-icons/ri"
import { Link } from 'react-router-dom';


interface NavbarProps {
  onTabSelect: (tab: TabSelectionForStore) => void;
}

const NavbarForStore: React.FC<NavbarProps> = ({ onTabSelect }) => {

  return (
    <div className="mb-6">
      <div>
        <h3 className="bold mb-2 text-sm text-zinc-500">Menu</h3>
        <nav className="flex flex-col gap-y-3">
          <li 
            className="flex items-center cursor-pointer"
          >
            <AiOutlineMail size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500 relative">
              メッセージ
              <span className="w-[10px] h-[10px] bg-red-500 rounded-full absolute -left-5"></span>
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('approvalRequest')} 
          >
            <AiOutlineCheckSquare size={20} className="mr-3"/>
            <span className="text-md hover:text-zinc-500">
              店舗承認申請
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer"
            onClick={() => onTabSelect('products')} 
          >
            <BsBoxSeam size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">商品管理</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <BiTransfer size={20} className="mr-3" />
            <span className="text-md hover:text-zinc-500">取引履歴</span>
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

export default NavbarForStore
