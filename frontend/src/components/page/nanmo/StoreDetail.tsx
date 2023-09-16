import { useContext, useEffect, useState } from 'react'
import {AiOutlineArrowLeft,AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import { Link, Navigate, useParams } from 'react-router-dom';
import { Product } from '../../../Types/types';
import Button from '../../ui/global/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../../context/UserContext';


const StoreDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState('')
  const { userInfo } = useContext(UserContext);

  const Success = () => toast.success('注文に成功しました 🎉', 
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
  const Fail = () => toast.error('注文に失敗しました 😫', 
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/product/getProduct/${id}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [id]);


  // 数量を増やす関数
  const increaseQuantity = () => {
    if(product){
      if(quantity <= product.stocks - 1){
        setQuantity(prevQuantity => prevQuantity + 1);
      }
    }
  }

  // 数量を減らす関数
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }


  const handleOrder = async () => {
    if (!userInfo) {
      alert('ログインしてください');
      return;
    }

    try {
      if(product){
        const order = {
          user: userInfo.id,  
          store: product.store._id,
          items: [{
            product: product._id,
            quantity: quantity
          }]
        };

        console.log("Sending order:", order);

        const response = await fetch(`http://localhost:4000/api/order/createOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        });

        const data = await response.json();
        if (response.status === 201) {
          console.log("注文が完了しました");
          Success();

          // todo : 注文が成功したら、Productのstocksからquantityをマイナスする
          try {
            const updateStocksResponse = await fetch(`http://localhost:4000/api/product/updateProductStock/${product._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ quantity })
            });
    
            if (updateStocksResponse.status !== 200) {
              console.error("製品の在庫の更新に失敗しました");
              return;
            }
    
            setProduct(prevProduct => {
              if (prevProduct) {
                return {
                  ...prevProduct,
                  stocks: prevProduct.stocks - quantity
                };
              }
              return prevProduct;
            });
    
          } catch (error) {
            console.error("製品の在庫の更新中にエラーが発生しました", error);
          }

          setTimeout(() => {
            setRedirect('/nanmo/payment');
          },3000)
        } else {
          Fail()
          console.error(`Error ${response.status}: ${data.message}`);
        }
      }
    } catch (error) {
      console.error(error);
      Fail()
    }
  }

  if(redirect){
    return <Navigate to={redirect} />;
  }


  return (
    <div>
      <ToastContainer />
      <Link to="/nanmo">
        <div className="flex items-center gap-x-1 group">
          <div className='p-2 group-hover:bg-white duration-300 rounded-full inline-block w-[40px] h-[40px]'>
            <AiOutlineArrowLeft size={22}/>
          </div>
          <p className="text-[6px] hover:text-green-700 duration-300">ホームに戻る</p>
        </div>
      </Link>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}

      {!loading && product && (
        <div className='bg-white rounded-lg p-4 mt-4 break-words'>
          <div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <div>
                  <img
                    src= {product.store.storeLogo ? `http://localhost:4000/${product.store.storeLogo}` : "/images/logo.png"}
                    alt={"ロゴ画像"}
                    width={100}
                    height={100}
                    className='object-fit w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] rounded-full'
                  />
                </div>
                <div>
                  <h1 className='text-base sm:text-2xl font-bold'>{product.store.storeName}</h1>
                  <p className='text-[8px] sm:text-base'>{product.store.address} {product.store.detailedAddress}</p>
                </div>
              </div>
              <div className='hidden sm:block'>
                {userInfo?.isStore || product.stocks <= 0 ? (
                  <></>
                ) : (
                  <div className="flex items-center gap-x-4">
                    {/* 数量操作のセクションを追加 */}
                    <div className='flex items-center gap-4 md:mt-1'>
                      <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={increaseQuantity}><AiOutlinePlus /></button>
                    </div>
                    <Button onClick={handleOrder}>購入</Button>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-y-1 mt-8'>
              <div className='mb-4 flex flex-col md:flex-row gap-x-8 md:items-center'>
                <span className='text-[12px]'>残り : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>{product.stocks}</span>個</span>
                {/* <span className="text-[12px]">ジャンル : <span className="border border-green-700 px-2 py-1 rounded-md">飲食店</span></span> */}
                <span className='text-[12px]'>受取可能時間 : <span className='bg-green-700 text-white px-2 py-1 rounded-md mr-1'>{product.pickupDate}</span>{product.pickupTime.start} - {product.pickupTime.end}</span>
              </div>
              <p className='font-bold text-xl'>{product.name}</p>
              <p>{product.description}</p>
            </div>
          </div>

          {product.productImage ? (
            <div className='flex items-center justify-center'>
              <img 
                src={`http://localhost:4000/${product.productImage}`} 
                alt=""
                className='w-full md:w-[70%] h-[450px] mt-8 object-cover rounded'
              />
            </div>
          ) : (<></>)}

          <div className='mt-8 flex flex-row items-center justify-between sm:justify-end'>
            <div className='sm:hidden'>
              {userInfo?.isStore || product.stocks <= 0 ? (
                  <></>
              ) : (
                <div className="flex items-center gap-x-4">
                    {/* 数量操作のセクションを追加 */}
                    <div className='flex items-center gap-4 md:mt-1'>
                      <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={increaseQuantity}><AiOutlinePlus /></button>
                    </div>
                    <Button onClick={handleOrder}>購入</Button>
                </div>
              )}
            </div>
            <div className='flex justify-end items-center '>
              {/* <p className='text-[12px] flex items-center gap-x-1'><CiStar size={25}/>3.8 (120)</p> */}
              <p><span className='font-bold text-xl md:text-3xl'>¥{product.price}</span><span className='text-[8px] md:text-[16px] ml-1 line-through p-0.5'>¥{product.originalPrice}</span></p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default StoreDetail
