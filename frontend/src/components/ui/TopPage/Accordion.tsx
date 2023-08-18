
import { useState } from 'react';
import {BiSolidDownArrow,BiSolidUpArrow} from 'react-icons/bi'

interface AccordionProps {
  title : string
  content: string
}

const AccordionItem = ({ title, content }:AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-zinc-500'>
      <button
        className="flex justify-between w-full py-4 px-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow /> }</span>
      </button>
      {isOpen && <div className="py-3 px-4 bg-zinc-300">A. {content}</div>}
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="border border-zinc-800 rounded-lg w-full">
      <AccordionItem title="Nanmoはどうやって食品ロスを減らしているのですか？" content="Nanmoは店舗に売れ残りがちな食品を出品するプラットフォームを提供します。ユーザーはそれらの商品を定価の半額以下で購入できるため、未消費の食品を削減し、食品ロスを減らします。" />
      <AccordionItem title="どのような店舗がNanmoに参加していますか？" content="Nanmoには様々な飲食店、小売店、スーパーマーケットなどが参加しております。" />
      <AccordionItem title="Nanmoで購入する食品は新鮮ですか？" content="はい、出品される食品はまだ美味しく食べられるもので、Nanmoと店舗が品質を保証します。" />
      <AccordionItem title="定価の半額以下で食品を買うことは本当に可能ですか？" content="はい、Nanmoで出品される食品はその定価の半額以下で購入することができます。" />
      <AccordionItem title="Nanmoの利用は無料ですか？" content="ユーザーとしてのNanmoの利用は無料です。店舗として参加する場合の料金体系については、お問い合わせください。" />
      <AccordionItem title="函館市外でのサービスはありますか？" content="現在、Nanmoは函館市を中心にサービスを展開しています。今後の拡大については随時お知らせします。" />
      <AccordionItem title="Nanmoで買った食品に問題があった場合、どうすればいいですか？" content="何らかの問題があった場合は、すぐにNanmoのカスタマーサポートにご連絡ください。迅速に対応いたします。" />
      <AccordionItem title="店舗としてNanmoに参加するにはどうすればよいですか？" content="店舗として参加を希望される場合、Nanmoのウェブサイト上のお問い合わせ先からお問い合わせいただくか、専用フォームから申し込みいただけます。詳細な手順とガイドラインをご案内します。" />
    </div>
  );
};

export default Accordion;
