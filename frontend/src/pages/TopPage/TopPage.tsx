import About from "../../components/model/TopPage/About"
import ButtonSection from "../../components/model/TopPage/ButtonSection"
import Contact from "../../components/model/TopPage/Contact"
import Header from "../../components/model/TopPage/Header"
import Hero from "../../components/model/TopPage/Hero"
import Question from "../../components/model/TopPage/Questions"
import Reason from "../../components/model/TopPage/Reason"
import Wrapper from "../../components/model/global/Wrapper"
import Footer from "../../components/ui/TopPage/Footer"

const TopPage = () => {
  return (
    <div>
      <Header />
      <Wrapper className="min-h-screen flex flex-col justify-center mt-16">
        <Hero />
        <About />
        <Reason />
        <ButtonSection />
        <Question />
        <Contact />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default TopPage
