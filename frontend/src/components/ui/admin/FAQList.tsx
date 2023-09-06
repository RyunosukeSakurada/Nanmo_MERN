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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [editQuestion, setEditQuestion] = useState(question); 
  const [editAnswer, setEditAnswer] = useState(answer); 

  const editFAQSuccess = () => toast.success('FAQの編集に成功しました', 
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

const editFAQfailed = () => toast.error('FAQの編集に失敗しました', 
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

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/editfaq/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: editQuestion, answer: editAnswer })
      });
      const data = await response.json();
      if (data.message === "FAQが更新されました") {
        editFAQSuccess()
      } else {
        editFAQfailed()
      }
    } catch (error) {
      editFAQfailed()
    }
    setShowEditPopup(false); // ポップアップを閉じる
  };

  return (
    <div className='border-b border-zinc-500'>
      <div
        className="flex justify-between w-full py-4 px-4 focus:outline-none"
      >
        <span className="text-[12px]">{question}</span>
        <div className="flex items-center gap-x-2">
          <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow /> }</span>
          <button className="bg-green-500 text-white px-2 text-[8px] rounded" onClick={() => setShowEditPopup(true)}>編集</button>
          <button className="bg-red-500 text-white px-2 text-[8px] rounded" onClick={() => setShowDeletePopup(true)}>削除</button>
        </div>
      </div>
      {isOpen && <div className="py-3 px-4 bg-zinc-300 text-[8px]">A. {answer}</div>}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-4 rounded-lg w-[400px] text-center">
            <p>本当に削除しますか？</p>
            <div className="flex justify-center mt-8 gap-x-4">
              <button 
                className="bg-red-500 text-white rounded px-4 py-1"
                onClick={() => {
                setShowDeletePopup(false);
                _id && onDelete && onDelete(_id);
              }}>削除する</button>
              <button onClick={() => setShowDeletePopup(false)} className="ml-2">戻る</button>
            </div>
          </div>
        </div>
      )}
      {showEditPopup && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg w-[400px] text-center">
          <p>FAQを編集</p>
          <textarea value={editQuestion} onChange={e => setEditQuestion(e.target.value)} className="border p-4 w-full my-2" />
          <textarea value={editAnswer} onChange={e => setEditAnswer(e.target.value)} className="border p-4 w-full my-2" />
          <div className="flex justify-center mt-8 gap-x-4">
            <button
              className="bg-green-500 text-white rounded px-4 py-1"
              onClick={handleEdit}
            >
              更新
            </button>
            <button onClick={() => setShowEditPopup(false)} className="ml-2">戻る</button>
          </div>
        </div>
      </div>
    )}
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
