import { useCallback, useEffect, useState } from 'react';
import StoreProducts from "./StoreProducts"
import { Product } from '../../../Types/types';


interface Props {
  updateProductList: boolean;
}

const StoreProductsList = ({ updateProductList }:Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductDeleted, setIsProductDeleted] = useState<boolean>(false);

  // 商品の削除後のcallback関数
  const onProductDeleted = useCallback(() => {
    setIsProductDeleted(!isProductDeleted);
  }, [isProductDeleted]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/getProductsByStore`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [updateProductList,isProductDeleted]);

  return (
    <div className="flex-[1]">
      <span className="text-zinc-500">商品一覧</span>
      <div className="flex flex-col gap-y-4 mt-4">
        {products.length === 0 ? (
          <>
            <p className='text-zinc-500 mt-2 text-[12px]'>まだ商品を出品していません</p>
          </>
        ) : (
          products.map(product => (
            <StoreProducts key={product._id} product={product} onDeleted={onProductDeleted}/>
          ))
        )}
      </div>
    </div>
  )
}

export default StoreProductsList
