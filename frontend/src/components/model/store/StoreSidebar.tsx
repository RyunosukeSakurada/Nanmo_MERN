import { Link } from "react-router-dom";
import StoreNavbar from "../../ui/store/StoreNavbar";
import { TabSelectionForStore } from "../../../Types/types";


interface SidebarProps {
  onTabSelect: (tab: TabSelectionForStore) => void;
}

const SidebarForStore: React.FC<SidebarProps> = ({ onTabSelect}) => {
  return (
    <div className="bg-white py-4 px-6 shadow rounded-lg">
      <Link to="/">
        <h1 className="text-xl bold text-center mb-10">Nanmo <span className="text-green-700">.</span></h1>
      </Link>
      <StoreNavbar onTabSelect={onTabSelect} />
    </div>
  )
}

export default SidebarForStore
