import About from "../../components/model/TopPage/About"
import ButtonSection from "../../components/model/TopPage/ButtonSection"
import Contact from "../../components/model/TopPage/Contact"
import Header from "../../components/model/TopPage/Header"
import Hero from "../../components/model/TopPage/Hero"
import Questions from "../../components/model/TopPage/Questions"
import Reason from "../../components/model/TopPage/Reason"
import Wrapper from "../../components/model/global/Wrapper"
import Footer from "../../components/model/global/Footer"

const TopPage = () => {
  return (
    <div>
      <Header />
      <Wrapper className="min-h-screen flex flex-col justify-center mt-16">
        <Hero />
        <div id="about"><About /></div>
        <div id="reason"><Reason /></div>
        <ButtonSection />
        <div id="questions"><Questions /></div>
        <div id="contact"><Contact /></div>
      </Wrapper>
      <Footer />
    </div>
  )
}

export default TopPage
