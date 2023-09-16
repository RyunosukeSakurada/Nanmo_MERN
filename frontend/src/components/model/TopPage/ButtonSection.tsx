import { Link } from "react-router-dom"
import AccentButton from "../../ui/global/AccentButton"
import Button from "../../ui/global/Button"

const ButtonSection = () => {
  return (
    <section>
      <div className='flex flex-row justify-center items-center gap-x-3 '>
        <Link to="/register">
          <AccentButton>無料で登録する</AccentButton>
        </Link>
        <Link to="/nanmo">
          <Button>フードを探す</Button>
        </Link>
      </div>
    </section>
  )
}

export default ButtonSection
