import { useEffect, useRef, useState } from "react";
import {MdArrowDropDown,MdArrowDropUp} from "react-icons/md"

interface DropdownMenuProps {
  onTableSelect: (table: "user" | "store" | "suspendeduser" | "blockeduser") => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onTableSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState("メニュー");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-2 md:mt-0" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)} className="w-56 justify-between flex items-center gap-x-2 border py-1 px-4 rounded">
        <span className="text-[12px]">{selectedItem}</span>
        {showDropdown ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </button>
      {showDropdown && (
          <nav className="absolute right-0 mt-2 w-full text-[8px] bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
            <li 
              onClick={() => {
                onTableSelect("user");
                setSelectedItem("一般ユーザーリスト");
                setShowDropdown(false);
              }} 
              className="cursor-pointer p-4 hover:text-zinc-500"
            >
              一般ユーザーリスト
            </li>
            <li 
              onClick={() => {
                onTableSelect("store");
                setSelectedItem("店舗ユーザーリスト");
                setShowDropdown(false);
              }} 
              className="cursor-pointer p-4 hover:text-zinc-500"
            >
              店舗ユーザーリスト
            </li>
            <li 
              onClick={() => {
                onTableSelect("suspendeduser");
                setSelectedItem("一時利用停止リスト");
                setShowDropdown(false);
              }} 
              className="cursor-pointer p-4 hover:text-zinc-500"
            >
              一時利用停止リスト
            </li>
            <li 
              onClick={() => {
                onTableSelect("blockeduser");
                setSelectedItem("ブロックリスト");
                setShowDropdown(false);
              }} 
              className="cursor-pointer p-4 hover:text-zinc-500"
            >
              ブロックリスト
            </li>
          </nav>
      )}
    </div>
  )
}

export default DropdownMenu
