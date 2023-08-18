import { Link } from "react-router-dom"
import RegisterButton from "../../ui/TopPage/RegisterButton"
import Wrapper from "../global/Wrapper"
import LoginButton from "../../ui/TopPage/LoginButton"

const Header = () => {
  return (
    <header className="border-b border-zinc-700 w-full bg-zinc-200">
      <Wrapper className='flex items-center justify-between'>
        <div className="flex items-center">
          <h1 className='text-2xl font-bold cursor-pointer'>Nanmo<span className="text-green-700">.</span></h1>
        </div>
        <div className="flex items-center gap-x-3">
          <Link to="/register">
            <RegisterButton /> 
          </Link>
          <Link to="/login">
            <LoginButton />
          </Link>
        </div>
      </Wrapper>
    </header>
  )
}

export default Header
