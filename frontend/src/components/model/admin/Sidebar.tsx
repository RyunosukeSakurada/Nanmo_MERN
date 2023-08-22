import { Link } from "react-router-dom"
import Navbar from "../../ui/admin/Navbar"
import { TabSelection } from "../../../Types/types";


interface SidebarProps {
  onTabSelect: (tab: TabSelection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabSelect }) => {
  return (
    <div className="bg-white py-4 px-6 shadow rounded-lg">
      <Link to="/">
        <h1 className="text-xl bold text-center mb-10">Nanmo <span className="text-green-700">.</span></h1>
      </Link>
      <Navbar onTabSelect={onTabSelect} />
    </div>
  )
}

export default Sidebar
