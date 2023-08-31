import AddProduct from "../../ui/store/AddProduct"
import StoreProductsList from "../../ui/store/StoreProductsList"

const ManageProducts = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="">
        <h3 className="bold">商品管理</h3>

        <div className="flex mt-8 gap-x-4">
          <AddProduct />
          <StoreProductsList />
        </div>
      </div>
    </div>
  )
}

export default ManageProducts
