import { useEffect, useState } from 'react';
import StoreProducts from "./StoreProducts"
import { Product } from '../../../Types/types';

const StoreProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/product/getProductsByStore', {
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
  }, []);

  return (
    <div className="flex-[1]">
      <span className="text-zinc-500">商品一覧</span>
      <div className="flex flex-col gap-y-4 mt-4">
        {products.map(product => (
          <StoreProducts key={product._id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default StoreProductsList
