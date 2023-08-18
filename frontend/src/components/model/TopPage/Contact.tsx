import ContactForm from "../../ui/TopPage/ContactForm"
import SectionHeader from "../../ui/TopPage/SectionHeader"

const Contact = () => {
  return (
    <section className='w-full'>
      <SectionHeader subtitle="- Contact" title="お問い合わせ"/>
      <ContactForm />
    </section>
  )
}

export default Contact
