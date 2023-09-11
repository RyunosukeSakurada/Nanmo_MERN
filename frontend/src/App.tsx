import {Route,Routes} from "react-router-dom"
import TopPage from "./pages/TopPage/TopPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Nanmo from "./pages/nanmo/Nanmo"
import StoreDetail from "./pages/nanmo/StoreDetail"
import Admin from "./pages/admin/Admin"
import Store from "./pages/store/Store"
import Payment from "./pages/payment/Payment"
import { UserContextProvider } from "./context/UserContext"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import Success from "./pages/payment/Success"


function App() {
  // Stripeの公開キー
  const PUBLIC_KEY = "pk_test_51NoXE8EUcHgNXzB8nLHYFGDjQQCFtsYJpzyGaRJTJ6oy9sHuaHTgJWkqOtKRCCtUbAx6tlzylqaOQjbRy8DajFYv00uCgE7a58";
  const stripePromise = loadStripe(PUBLIC_KEY);

  return (
    <>
    <UserContextProvider>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={ <TopPage />} />
          <Route path="/login" element = { <Login />} />
          <Route path="/register" element = { <Register />} />
          <Route path="/nanmo" element = {<Nanmo />} />
          <Route path="/nanmo/storeDetail/:id" element = {<StoreDetail />} />
          <Route path="/nanmo/payment" element = {<Payment />} />
          <Route path="/admin/dashboard" element = {<Admin />} />
          <Route path="/store/dashboard" element = {<Store />} />
          <Route path="/payment-success" element = {<Success />} />
        </Routes>
      </Elements>
    </UserContextProvider>
    </>
  )
}

export default App
