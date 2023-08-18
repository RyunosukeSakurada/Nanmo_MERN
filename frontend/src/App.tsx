import {Route,Routes} from "react-router-dom"
import TopPage from "./pages/TopPage/TopPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <TopPage />} />
        <Route path="/login" element = { <Login />} />
        <Route path="/register" element = { <Register />} />
      </Routes>
    </>
  )
}

export default App
