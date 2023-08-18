import Footer from "../../components/model/global/Footer"
import Wrapper from "../../components/model/global/Wrapper"
import Header from "../../components/model/nanmo/Header"
import MainPage from "../../components/page/nanmo/MainPage"

const Nanmo = () => {
  return (
    <div>
      <Header />
      <Wrapper className="min-h-screen flex flex-col max-w-[850px]">
        <MainPage />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default Nanmo
