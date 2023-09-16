import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void; 
}

const Button = ({ children, className,onClick }: ButtonProps) => {
  return (
      <button
      className={`border border-zinc-800 rounded-2xl px-4 py-2 hover:opacity-60 hover:shadow-lg duration-300 text-sm md:text-base ${
        className || ""
      }`}
      onClick={onClick} 
      >
        {children}
      </button>
  )
}

export default Button
