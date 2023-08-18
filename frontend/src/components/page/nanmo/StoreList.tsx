import { Link } from "react-router-dom"
import Store from "../../model/nanmo/Store"

const StoreList = () => {
  return (
    <div className='grid grid-cols-3 gap-6 mt-16'>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
      <Link to="/nanmo/StoreDetail">
        <Store />
      </Link>
    </div>
  )
}

export default StoreList

