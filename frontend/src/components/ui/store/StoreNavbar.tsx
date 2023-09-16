import React from 'react'
import { TabSelectionForStore } from "../../../Types/types";
import { AiOutlineCheckSquare,AiOutlineHome} from "react-icons/ai"
import {BiTransfer,BiStore} from "react-icons/bi"
import {BsBoxSeam} from "react-icons/bs"
import {RiFileList2Line} from "react-icons/ri"
import { Link } from 'react-router-dom';


interface NavbarProps {
  onTabSelect: (tab: TabSelectionForStore) => void;
}

const NavbarForStore: React.FC<NavbarProps> = ({ onTabSelect }) => {

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
            onClick={() => onTabSelect('approvalRequest')} 
          >
            <AiOutlineCheckSquare className="mr-3 lg:mr-1 icon"/>
            <span className="text-sm lg:text-md hover:text-zinc-500">
              承認申請
            </span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('products')} 
          >
            <BsBoxSeam className="mr-3 lg:mr-1 icon" />
            <span className="text-sm lg:text-md hover:text-zinc-500">商品管理</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('order')} 
          >
            <BiTransfer  className="mr-3 lg:mr-1 icon" />
            <span className="text-sm lg:text-md hover:text-zinc-500">取引履歴</span>
          </li>
          <li 
            className="flex items-center cursor-pointer bg-white p-4 lg:bg-transparent lg:p-0"
            onClick={() => onTabSelect('storeInformation')} 
          >
            <BiStore  className="mr-3 lg:mr-1 icon" />
            <span className="text-sm lg:text-md hover:text-zinc-500">店舗情報</span>
          </li>
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

export default NavbarForStore
