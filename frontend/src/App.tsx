import {Route,Routes} from "react-router-dom"
import TopPage from "./pages/TopPage/TopPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Nanmo from "./pages/nanmo/Nanmo"
import StoreDetail from "./pages/nanmo/StoreDetail"
import Admin from "./pages/admin/Admin"
import Store from "./pages/store/Store"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <TopPage />} />
        <Route path="/login" element = { <Login />} />
        <Route path="/register" element = { <Register />} />
        <Route path="/nanmo" element = {<Nanmo />} />
        <Route path="/nanmo/storeDetail" element = {<StoreDetail />} />
        <Route path="/admin/dashboard" element = {<Admin />} />
        <Route path="/store/dashboard" element = {<Store />} />
      </Routes>
    </>
  )
}

export default App
