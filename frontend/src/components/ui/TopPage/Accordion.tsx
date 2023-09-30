
import { useEffect, useState } from 'react';
import {BiSolidDownArrow,BiSolidUpArrow} from 'react-icons/bi'

interface AccordionProps {
  question : string
  answer: string
}

const AccordionItem = ({ question,answer }:AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-zinc-500'>
      <button
        className="flex justify-between w-full p-2 md:p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-[6px] md:text-base text-start'>{question}</span>
        <span className='mt-1 md:mt-0'>{isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow /> }</span>
      </button>
      {isOpen && <div className="py-1 md:py-3 px-2 md:px-4 bg-zinc-300 text-[6px] md:text-base">A. {answer}</div>}
    </div>
  );
};

const Accordion = () => {
  const [faqs, setFaqs] = useState<AccordionProps[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getfaqs`, {
          method: 'GET',
          credentials: 'include', 
        });
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("FAQの取得に失敗:", error);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="border border-zinc-800 rounded-lg w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default Accordion;
