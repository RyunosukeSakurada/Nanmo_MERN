import SectionHeader from "../../ui/TopPage/SectionHeader"

const About = () => {
  return (
    <section>
      <SectionHeader subtitle="-About" title="Nanmoとは"/>

      <div>
        <div>
          食は命、文化、人々のつながりです。だからこそ、食への敬意と感謝を忘れてはなりません。
          <br />
          しかし日本では<span className='font-semibold'>年間約612万トン</span>もの食べ物が捨てられており、これは<span className='font-semibold'>東京ドーム約5杯分</span>に相当します。
          <br/>
          <p className='text-sm text-zinc-500'>出典／農林水産省・環境省調べ、FAO、総務省人口推計（2017年）</p>
          <br />
          <span className='text-xl font-semibold'>Nanmo</span>は、まだ美味しく食べられるのに廃棄されてしまう食べ物を定価の半額または3分の1程度の値段で提供するサービスです。
          北海道弁で「大丈夫だよ」という意味の「なんも」に由来し、協力する人々がお互いに「なんもだよ〜」と言い合うことで、人と人の温かいつながりを築きながらフードロスの削減を目指しています。
        </div>
      </div>
    </section>
  )
}

export default About
