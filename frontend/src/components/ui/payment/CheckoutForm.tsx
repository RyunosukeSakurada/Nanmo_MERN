import React from 'react';
import { CardElement } from "@stripe/react-stripe-js";
import Button from '../global/Button';

type Props = {
  handlePurchase: () => Promise<void>;
};

const CheckoutForm: React.FC<Props> = ({ handlePurchase }) => {
  return (
    <div className="flex-[1] flex flex-col gap-y-8 bg-white rounded-lg p-4">
      <p className="text-zinc-500 text-[8px] mb-4">カード情報入力</p>
      {/* カード情報入力 */}
      <CardElement />
      <Button onClick={handlePurchase}>購入</Button>
    </div>
  )
}

export default CheckoutForm
