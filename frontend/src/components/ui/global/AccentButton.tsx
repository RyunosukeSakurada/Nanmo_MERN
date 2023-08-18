import { ReactNode }  from 'react'

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void; 
  type?: 'button' | 'submit' | 'reset';
}

const AccentButton = ({ children, className,type,onClick }: ButtonProps) => {
  return (
    <button
    className={`border border-green-700 bg-green-700 text-zinc-200 rounded-2xl px-4 py-2 hover:opacity-60 hover:shadow-lg duration-300 ${
      className || ""
    }`}
    onClick={onClick} 
    type={type}
    >
      {children}
    </button>
  )
}

export default AccentButton
