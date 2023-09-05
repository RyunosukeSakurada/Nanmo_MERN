import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Store from "../../model/nanmo/Store";
import { Product } from '../../../Types/types';

const StoreList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:4000/api/product/getProducts");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false)
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-16">ローディング中...</div>;  
  }

  return (
    <div className='grid grid-cols-3 gap-6 mt-16'>
      {products.length === 0 ? 
        <div>
          <p className="text-zinc-500 text-xl">商品がありません😫</p>
        </div> 
        :
        products.filter(product => !product.isSold).map((product) => (
          <Link to={`/nanmo/StoreDetail/${product._id}`} key={product._id}>
            <Store product={product} />
          </Link>
      ))}
    </div>
  );
};

export default StoreList;

