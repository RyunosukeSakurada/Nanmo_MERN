import {BiMapPin,BiPhone,BiLogoFacebookCircle} from 'react-icons/bi'
import {AiFillInstagram,AiOutlineTwitter} from 'react-icons/ai'
import {GoMail} from 'react-icons/go'
import Wrapper from './Wrapper'

const Footer = () => {
  return (
    <footer className='border-t border-zinc-700 mt-24'>
      <Wrapper>
        <div className='flex justify-between'>
          <div>
            <h1 className="text-2xl font-bold cursor-pointer">Nanmo</h1>
            
            <div className='flex flex-col gap-y-1 mt-1'>
              <p className='flex items-center gap-x-2'>
                <BiMapPin size={20}/><span>北海道函館市XXX町X-XX-XX</span>
              </p>
              <p className='flex items-center gap-x-2'>
                <BiPhone size={20} /><span>0138-XX-XXXX</span>
              </p>
              <p className='flex items-center gap-x-2'>
                <GoMail size={20}/><span className='-mt-1'>Info@example.com</span>
              </p>
            </div>
          </div>

          <div className='flex items-center gap-x-4'>
            <AiFillInstagram size={40} className="hover:-translate-y-1 duration-300"/>
            <BiLogoFacebookCircle size={40} className="hover:-translate-y-1 duration-300"/>
            <AiOutlineTwitter size={40} className="hover:-translate-y-1 duration-300" />
          </div>
        </div>
        <div className='flex justify-center items-center mt-4'>
          &copy; {new Date().getFullYear()} Nanmo - All rights reserved
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer
