import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BiSolidDownArrow,BiSolidUpArrow} from 'react-icons/bi'


interface AccordionProps {
  question : string
  answer: string
  _id?: string; 
  onDelete?: (id: string) => void; 
}


const FAQItem = ({ question,answer,_id, onDelete  }:AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-zinc-500'>
      <div
        className="flex justify-between w-full py-4 px-4 focus:outline-none"
      >
        <span className="text-[12px]">{question}</span>
        <div className="flex items-center gap-x-2">
          <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow /> }</span>
          <button className="bg-green-500 text-white px-2 text-[8px] rounded">編集</button>
          <button className="bg-red-500 text-white px-2 text-[8px] rounded" onClick={() => _id && onDelete && onDelete(_id)}>削除</button>
        </div>
      </div>
      {isOpen && <div className="py-3 px-4 bg-zinc-300 text-[8px]">A. {answer}</div>}
    </div>
  );
};

const FAQList = () => {
  const [faqs, setFaqs] = useState<AccordionProps[]>([]);

  //toastify
  const deleteFAQSuccess = () => toast.success('FAQの削除に成功しました 🎉', 
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

  const deleteFAQFail = () => toast.error('FAQの削除に失敗しました 😫', 
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
    const fetchFaqs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/auth/getfaqs');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("FAQの取得に失敗:", error);
      }
    };
    fetchFaqs();
  }, [faqs]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/deletefaq/${id}`, { method: 'DELETE' });
      if (response.status === 200) {
        setFaqs(prev => prev.filter(faq => faq._id !== id));
        deleteFAQSuccess()
      } else {
        deleteFAQFail()
      }
    } catch (error) {
      console.error('FAQの削除に失敗:', error);
      deleteFAQFail()
    }
  };

  return (
    <div className="border border-zinc-800 rounded-lg w-full">
      <ToastContainer />
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} _id={faq._id} onDelete={handleDelete} />
      ))}
    </div>
  )
}

export default FAQList
