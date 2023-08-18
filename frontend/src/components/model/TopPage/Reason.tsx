import React, { ReactNode } from 'react'
import {FaRecycle} from 'react-icons/fa'
import {BsGraphUpArrow} from 'react-icons/bs'
import {CiForkAndKnife} from 'react-icons/ci'
import SectionHeader from '../../ui/TopPage/SectionHeader'

interface BoxProps {
  icon: ReactNode
  title: string
  description: string
}

const Reason = () => {
  
  const Box: React.FC<BoxProps> = ({ icon, title, description }) => {
    return (
      <div className="shadow p-4 rounded-xl w-1/3">
        <div className='flex justify-center items-center '>
          {icon}
        </div>
        <h1 className='text-center font-bold my-3'>{title}</h1>
        <div className='text-sm'>
          {description}
        </div>
      </div>
    );
  }
  
  return (
    <section>
      <SectionHeader subtitle="- Reason" title="なぜNanmoが選ばれるのか"/>

      <div className='flex flex-row w-full gap-x-4'>
        <Box
          icon={<FaRecycle size={30} />}
          title="効率的な収益化"
          description="余剰食材を迅速かつ容易に副収入源に変換することができるため、無駄を減らし経済的にも有益です。"
        />
        <Box
          icon={<BsGraphUpArrow size={30} />}
          title="認知度の拡充と顧客拡大"
          description="Nanmoを利用することで、お店の存在をより多くの人に広め、より幅広い顧客層へとつながるチャンスを提供します。"
        />
        <Box
          icon={<CiForkAndKnife size={30} />}
          title="お得な価格での楽しい食体験"
          description="おいしい食べ物が入ったサプライズバッグを特別な価格で楽しむことができ、同時に環境に対する貢献感も享受できます。"
        />
      </div>
    </section>
  );
}

export default Reason
