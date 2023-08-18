import Navbar from "../../ui/TopPage/Navbar"
import RegisterButton from "../../ui/TopPage/RegisterButton"
import StartButton from "../../ui/TopPage/StartButton"
import Wrapper from "../global/Wrapper"

const Header = () => {
  return (
    <header className="border-b border-zinc-700 fixed w-full z-10 top-0 bg-zinc-200">
      <Wrapper className='flex items-center justify-between'>
        <div className="flex items-center">
          <h1 className='text-2xl font-bold cursor-pointer'>Nanmo<span className="text-green-700">.</span></h1>
          <Navbar />
        </div>
        <div className="flex items-center gap-x-3">
          <RegisterButton /> 
          <StartButton />
        </div>
      </Wrapper>
    </header>
  )
}

export default Header
