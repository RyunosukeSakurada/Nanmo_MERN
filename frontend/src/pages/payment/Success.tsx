import { Link } from "react-router-dom"
import Button from "../../components/ui/global/Button"

const Success = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-green-700 text-xl">決済が完了しました</h1>
      <Link to="/nanmo">
        <Button className="mt-8">ストアに戻る</Button>
      </Link>
    </div>
  )
}

export default Success
