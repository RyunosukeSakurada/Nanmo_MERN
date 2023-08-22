import { Link } from "react-router-dom"
import Navbar from "../../ui/admin/Navbar"

const Sidebar = () => {
  return (
    <div className="bg-white py-4 px-6 shadow rounded-lg">
      <Link to="/">
        <h1 className="text-xl bold text-center mb-10">Nanmo <span className="text-green-700">.</span></h1>
      </Link>
      <Navbar />
    </div>
  )
}

export default Sidebar
