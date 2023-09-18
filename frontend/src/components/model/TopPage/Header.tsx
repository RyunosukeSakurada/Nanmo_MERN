import { Link } from "react-router-dom"
import Navbar from "../../ui/TopPage/Navbar"
import RegisterButton from "../../ui/TopPage/RegisterButton"
import StartButton from "../../ui/TopPage/StartButton"
import Wrapper from "../global/Wrapper"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext"
import {AiOutlineLogout,AiOutlineMenu,AiOutlineClose} from "react-icons/ai"


const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const email = userInfo?.email
  const isAdmin = userInfo?.isAdmin;
  const isStore = userInfo?.isStore;
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`,{
      credentials:"include",
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  },[setUserInfo])

  function logout(){
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,{
      credentials:'include',
      method: 'POST',
    })
    setUserInfo(null )
  }

  const humbergerToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="border-b border-zinc-700 fixed w-full z-10 top-0 bg-zinc-200">
      <Wrapper className='flex items-center justify-between'>
        <div className="flex items-center">
          <Link to="/">
            <h1 className='text-2xl font-bold cursor-pointer'>Nanmo<span className="text-green-700">.</span></h1>
          </Link>
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-x-3">
          {!email && (
            <>
              <Link to="/register">
                <RegisterButton /> 
              </Link>
              <Link to="/nanmo">
                <StartButton />
              </Link>
            </>
          )}
          {email && (
            <>
              <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                <Link to="/nanmo">
                  ストア
                </Link>
              </div>
              {isAdmin && (
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                  <Link to="/admin/dashboard">
                    管理者画面
                  </Link>
                </div>
              )}
              {isStore && (
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                  <Link to="/store/dashboard">
                    管理者画面
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-x-1 group">
                <a onClick={logout} className="cursor-pointer text-[8px] hover:text-zinc-500">
                  ログアウト
                </a>
                <AiOutlineLogout size={12} className="hidden group-hover:block"/>
              </div>
            </>
          )}
        </div>

        {/* ハンバーガーメニュー */}
        <div className="md:hidden" onClick={humbergerToggle}>
          {isOpen ? (<AiOutlineClose />) : (<AiOutlineMenu />)}
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-[4rem] right-0 bg-slate-50 p-4 w-full">
            <Navbar />
            <div className="border-t border-black mt-4">
              {!email && (
                <div className="mt-8 flex gap-x-2 items-center justify-center">
                  <Link to="/register">
                    <RegisterButton /> 
                  </Link>
                  <Link to="/nanmo">
                    <StartButton />
                  </Link>
                </div>
              )}
              {email && (
                <div className="gap-y-4 flex flex-col mt-4">
                  <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                    <Link to="/nanmo">
                      ストア
                    </Link>
                  </div>
                  {isAdmin && (
                    <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                      <Link to="/admin/dashboard">
                        管理者画面
                      </Link>
                    </div>
                  )}
                  {isStore && (
                    <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                      <Link to="/store/dashboard">
                        管理者画面
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-x-1 group"> 
                    <a onClick={logout} className="cursor-pointer text-[8px] hover:text-zinc-500 bg-white p-2 w-full">
                      ログアウト
                    </a>
                    <AiOutlineLogout size={12} className="hidden group-hover:block"/>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Wrapper>
    </header>
  )
}

export default Header
