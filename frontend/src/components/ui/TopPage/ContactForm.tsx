import { ChangeEvent, FormEvent, useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai'

const ContactForm = () => {
  const initialFormState = {
    name: '',
    store: '',
    email: '',
    message: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmationOpen(true);
  };

  const handleConfirmation = () => {
    setIsConfirmationOpen(false);
    setIsSubmitted(true);
    setFormState(initialFormState); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='border p-4 rounded-lg shadow-lg bg-zinc-100 break-words'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">お名前 <span className="text-[6px] text-red-500">※必須</span></label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="store" className="block text-sm font-bold mb-2">店舗名 <span className="text-[6px]">※個人の場合は「個人」と入力してください</span></label>
            <input
              type="text"
              name="store"
              value={formState.store}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">メールアドレス <span className="text-[6px] text-red-500">※必須</span></label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">メッセージ (250文字以内) <span className="text-[6px] text-red-500">※必須</span></label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              rows={5}
              maxLength={250}
            />
          </div>
          <button type="submit" className="bg-green-700 text-white py-2 px-8 rounded-2xl">送信</button>
        </form>
        {isConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-start relative w-[400px] break-words">
            <h3 className="mb-4 text-center">以下の内容で送信しますか？</h3>
            <div className='mt-2'>
              お名前 
              <p className='border rounded px-3 py-2'>{formState.name}</p>
            </div>
            <div className='mt-2'>
              店舗名 
              <p className='border rounded px-3 py-2'>{formState.store}</p>
            </div>
            <div className='mt-2'>メールアドレス 
              <p className='border rounded px-3 py-2'>{formState.email}</p>
            </div>
            <div className='mt-2'>メッセージ 
              <p className='border rounded px-3 py-2 text-[12px]'>{formState.message}</p>
            </div>
            <div className='flex justify-center items-center'>
              <button className="bg-green-700 text-white px-4 py-2 rounded-2xl mt-4 " onClick={handleConfirmation}>
                本当に送信しますか
              </button>
            </div>
            <button
                className="absolute top-2 right-2 focus:outline-none"
                onClick={() => setIsConfirmationOpen(false)}
              >
                <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
        {isSubmitted && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 focus:outline-none"
                onClick={() => setIsSubmitted(false)}
              >
                <AiOutlineClose />
              </button>
              <h3 className="text-center text-lg font-bold mb-2">お問い合わせいただき、ありがとうございます！</h3>
              <p className="text-center">お問い合わせ内容を受け付けました。追ってご連絡いたします。</p>
              <br />
              <div className="text-center mb-2">
                <span className="text-2xl font-bold">Nanmo</span>
              </div>
              <div className="text-center mb-2">
                <span className="text-md">対応可能時間: 10:00 - 19:00</span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ContactForm;
