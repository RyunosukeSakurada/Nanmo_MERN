import { useState } from "react";
import AddProduct from "../../ui/store/AddProduct"
import StoreProductsList from "../../ui/store/StoreProductsList"


interface ManageProductsProps {
  approved?: boolean;
}

const ManageProducts: React.FC<ManageProductsProps> = ({approved}) => {
  const [updateProductList, setUpdateProductList] = useState<boolean>(false);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="">
        <h3 className="bold">商品管理</h3>

        <div className="flex flex-col md:flex-row gap-y-4 mt-8 gap-x-4">
          <AddProduct setUpdateProductList={setUpdateProductList} approved={approved}/>
          <StoreProductsList updateProductList={updateProductList} />
        </div>
      </div>
    </div>
  )
}

export default ManageProducts
