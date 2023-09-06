import React, { useState } from 'react';
import AccentButton from "../../ui/global/AccentButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FAQFormProps {
  question : string
  answer: string
  _id?: string; 
  onDelete?: (id: string) => void; 
}

const FAQForm: React.FC<FAQFormProps> = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');


  //toastify
  const addFAQSuccess = () => toast.success('FAQの追加に成功しました 🎉', 
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

  const addFAQFail = () => toast.error('FAQの追加に失敗しました 😫', 
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/addfaq',{  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
      });
      if (response.status === 200) {
        setQuestion('');
        setAnswer('');
        addFAQSuccess()
      }
    } catch (error) {
      console.error('FAQの追加に失敗:', error);
      addFAQFail()
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <ToastContainer />
      <div className="shadow bg-zinc-100 flex flex-col p-4 rounded-lg">
        <label className="text-zinc-500 text-[8px]">質問:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="px-1 py-2 text-[12px]"
          required
        />
      </div>
      <div className="shadow bg-zinc-100 flex flex-col p-4 rounded-lg mt-4">
        <label className="text-zinc-500 text-[8px]">回答:</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="px-1 py-2 text-[12px]"
          required
        />
      </div>
      <div className='mt-4'>
        <AccentButton type="submit">追加</AccentButton>
      </div>
    </form>
  );
}

export default FAQForm;
