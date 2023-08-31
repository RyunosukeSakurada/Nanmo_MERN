import StoreProducts from "./StoreProducts"

const StoreProductsList = () => {

  return (
    <div className="flex-[1]">
      <span className="text-zinc-500">商品一覧</span>

      <div className="flex flex-col gap-y-4 mt-4">

        <StoreProducts/>
        <StoreProducts/>
      </div>
    </div>
  )
}

export default StoreProductsList
