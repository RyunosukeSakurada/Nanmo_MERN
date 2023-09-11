import { useEffect, useState } from 'react';
import { Order } from '../../Types/types';
import Header from '../../components/model/nanmo/Header';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/ui/payment/CheckoutForm';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getCurrentUser(); 
      if (!user) {
        alert('ログインしてください');
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
      alert("カード情報の取得に失敗しました");
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

    // ここでサーバーサイドにpaymentMethod.idを送信して実際の決済を行います。
    const response = await fetch(`http://localhost:4000/api/stripe/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentId: paymentMethod.id, amount: totalAmount })
    });

    const data = await response.json();
    if (data.success) {
      alert("決済成功!");
      setTimeout(() => {
        window.location.href = "/nanmo";
      }, 3000);
    } else {
      alert("決済失敗: " + data.message);
    }
  };

  return (
    <div>
      <Header/>
      {/* Loading表示 */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}

      {/* Orders表示 */}
      {!loading && (
        <div className='flex flex-row gap-x-8 p-4 mt-8 max-w-[1000px] mx-auto'>
          <div className='flex-[2] flex flex-col bg-white rounded-lg p-4'>
            <p className="text-zinc-500 text-[8px] mb-4">注文</p>

            {orders.map(order => (
              <div key={order._id}>
                {/* ここに表示したいOrderの情報を追加します。例えば、 */}
                {order.items.map(item => (
                  <div key={item.product._id} className='flex flex-row gap-x-4 p-4 shadow items-center'>
                    <img 
                      src={`http://localhost:4000/${item.product.productImage}`} 
                      alt=""
                      className='h-[80px] w-[80px] rounded-full'
                    />
                    <div className=''>
                      <p className='text-xl'>商品名: {item.product.name}</p>
                      <div className='flex gap-x-5'>
                        <p className='text-zinc-500'>数量: {item.quantity}</p>
                        <p className='text-zinc-500'>値段: {item.product.price}円</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <CheckoutForm handlePurchase={handlePurchase} />
        </div>
      )}
    </div>
  );
}

export default Payment;
