import StoreOrderList from "../../ui/store/StoreOrderList"

interface storeProps{
  storeId? : string
}

const StoreOrder:React.FC<storeProps> = ({storeId}) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="">
        <h3 className="bold">取引履歴</h3>

        <StoreOrderList storeId={storeId}/>
      </div>
    </div>
  )
}

export default StoreOrder
