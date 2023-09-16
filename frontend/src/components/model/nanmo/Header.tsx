import { Link } from "react-router-dom"
import RegisterButton from "../../ui/TopPage/RegisterButton"
import Wrapper from "../global/Wrapper"
import LoginButton from "../../ui/TopPage/LoginButton"
import { useContext, useEffect, useState} from "react"
import { UserContext } from "../../../context/UserContext"
import {AiOutlineLogout,AiOutlineMenu,AiOutlineClose} from "react-icons/ai"

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const email = userInfo?.email
  const isAdmin = userInfo?.isAdmin;
  const isStore = userInfo?.isStore;
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    fetch("http://localhost:4000/api/auth/profile",{
      credentials:"include",
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        console.log(userInfo)
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

  const humbergerToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="border-b border-zinc-700 w-full bg-zinc-200">
      <Wrapper className='flex items-center justify-between'>
        <div className="flex items-center">
          <Link to="/">
            <h1 className='text-2xl font-bold cursor-pointer'>Nanmo<span className="text-green-700">.</span></h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-x-3">
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
            <div className="flex items-center gap-x-4">
              {!isStore && (
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                  <Link to="/nanmo/payment">
                    注文
                  </Link>
                </div>
              )}
              <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                <Link to="/nanmo">
                  ストア
                </Link>
              </div>
              {isAdmin && (
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                  <Link to="/admin/dashboard">
                    ダッシュボード
                  </Link>
                </div>
              )}
              {isStore && (
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer">
                  <Link to="/store/dashboard">
                    ダッシュボード
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-x-1 group">
                <a onClick={logout} className="cursor-pointer text-[8px] hover:text-zinc-500">
                  ログアウト
                </a>
                <AiOutlineLogout size={12} className="hidden group-hover:block"/>
              </div>
            </div>
          )}
        </div>

        {/* ハンバーガーメニュー */}
        <div className="md:hidden" onClick={humbergerToggle}>
          {isOpen ? (<AiOutlineClose />) : (<AiOutlineMenu />)}
        </div>

        {isOpen &&(
          <div className="md:hidden absolute top-[4rem] right-0 bg-slate-100 p-4 w-full z-20">
            <div className="my-4 flex gap-x-4 justify-center items-center">
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
            </div>
            {email && (
              <div className="flex flex-col gap-y-4">
                {!isStore && (
                  <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                    <Link to="/nanmo/payment">
                      注文
                    </Link>
                  </div>
                )}
                <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                  <Link to="/nanmo">
                    ストア
                  </Link>
                </div>
                {isAdmin && (
                  <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                    <Link to="/admin/dashboard">
                      ダッシュボード
                    </Link>
                  </div>
                )}
                {isStore && (
                  <div className="text-[8px] hover:text-zinc-500 cursor-pointer bg-white p-2">
                    <Link to="/store/dashboard">
                      ダッシュボード
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
        )}
      </Wrapper>
    </header>
  )
}

export default Header
