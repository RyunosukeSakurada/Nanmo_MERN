import AccentButton from "../../ui/global/AccentButton"
import Button from "../../ui/global/Button"

const ButtonSection = () => {
  return (
    <section>
      <div className='flex justify-center items-center gap-x-3'>
          <AccentButton>無料で登録する</AccentButton>
          <Button>フードを探す</Button>
      </div>
    </section>
  )
}

export default ButtonSection
