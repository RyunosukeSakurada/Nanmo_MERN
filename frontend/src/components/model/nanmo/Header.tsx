import { Link } from "react-router-dom"
import RegisterButton from "../../ui/TopPage/RegisterButton"
import Wrapper from "../global/Wrapper"
import LoginButton from "../../ui/TopPage/LoginButton"
import { useContext, useEffect} from "react"
import { UserContext } from "../../../context/UserContext"
import {AiOutlineLogout} from "react-icons/ai"

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const email = userInfo?.email

  useEffect(() => {
    fetch("http://localhost:4000/api/auth/profile",{
      credentials:"include",
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  },[setUserInfo])

  function logout(){
    fetch("http://localhost:4000/api/auth/logout",{
      credentials:'include',
      method: 'POST',
    })
    setUserInfo(null )
  }


  return (
    <header className="border-b border-zinc-700 w-full bg-zinc-200">
      <Wrapper className='flex items-center justify-between'>
        <div className="flex items-center">
          <Link to="/">
            <h1 className='text-2xl font-bold cursor-pointer'>Nanmo<span className="text-green-700">.</span></h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          {!email && (
            <>
            <Link to="/register">
              <RegisterButton /> 
            </Link>
            <Link to="/login">
              <LoginButton />
            </Link>
            </>
          )}
          {email && (
            <>
              <div className="flex items-center gap-x-1 group">
                <a onClick={logout} className="cursor-pointer text-[8px] hover:text-zinc-500">
                  logout
                </a>
                <AiOutlineLogout size={12} className="hidden group-hover:block"/>
              </div>
            </>
          )}
        </div>
      </Wrapper>
    </header>
  )
}

export default Header
