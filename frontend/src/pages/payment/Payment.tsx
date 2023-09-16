import { useEffect, useState } from 'react';
import { Order } from '../../Types/types';
import Header from '../../components/model/nanmo/Header';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/ui/payment/CheckoutForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router';


const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  //toastify
  const checkoutSuccess = () => toast.success('決済に成功しました 🎉', 
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
  const checkoutFail = () => toast.error('決済に失敗しました 😫', 
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
  const loginFirst = () => toast.error('先にログインしてください 😫', 
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
  const getCardInfoFail = () => toast.error('カード情報の取得に失敗しました 😫', 
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

  const getCurrentUser = async () => {
    const response = await fetch(`http://localhost:4000/api/auth/profile`, {
      credentials: 'include', 
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return null;
    }
    return data;
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/order/updateOrderStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.ok) {
        console.log("注文のステータスが更新されました");
      } else {
        console.error("注文のステータスの更新に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser(); 
      if (!user) {
        loginFirst()
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/order/getOrdersByUser/${user.id}`);
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('注文の取得に失敗しました');
      }finally{
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePurchase = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      getCardInfoFail()
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    if (error) {
      console.error(error);
      return;
    }

    const totalAmount = orders.reduce((acc, order) => {
      return acc + order.items.reduce((itemAcc, item) => {
        return itemAcc + item.product.price * item.quantity;
      }, 0);
    }, 0) * 100; 

    const response = await fetch(`http://localhost:4000/api/stripe/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentId: paymentMethod.id, amount: totalAmount })
    });

    const data = await response.json();
    if (data.success) {
      checkoutSuccess()
      for(const order of orders) {
        if(order._id){
          await updateOrderStatus(order._id); 
        }
      }
      setTimeout(() => {
        setRedirect("/payment-success");
      }, 2000);
    } else {
      checkoutFail()
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <ToastContainer />
      <Header/>
      {/* Loading表示 */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}


      {/* Orders表示 */}
      {!loading && (
        <div className='flex flex-col-reverse md:flex-row gap-y-8 gap-x-8 p-4 mt-8 max-w-[1000px] mx-auto'>
          <div className='flex-[2] flex flex-col bg-white rounded-lg p-4'>
            <p className="text-zinc-500 text-[8px] mb-4">注文</p>

            {orders.length === 0 ? (
              <p className='p-4 text-zinc-500'>何もありません</p>
            ) : (
              orders.map(order => (
                <div key={order._id}>
                  {order.items.map(item => (
                    <div key={item.product._id} className='flex flex-row gap-x-4 p-4 shadow items-center'>
                      <img 
                        src={`http://localhost:4000/${item.product.productImage}`} 
                        alt="商品の画像"
                        className='h-[50px] w-[50px] md:h-[80px] md:w-[80px] rounded-full'
                      />
                      <div className=''>
                        <p className='text-[12px] md:text-xl'>商品名: {item.product.name}</p>
                        <div className='flex flex-col md:flex-row gap-x-5 text-[8px] md:text-base'>
                          <p className='text-zinc-500'>数量: {item.quantity}</p>
                          <p className='text-zinc-500'>値段: {item.product.price * item.quantity}円</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
          <CheckoutForm handlePurchase={handlePurchase} />
        </div>
      )}
    </div>  
  )
}

export default Payment;