import Footer from "../../components/model/global/Footer"
import Wrapper from "../../components/model/global/Wrapper"
import Header from "../../components/model/nanmo/Header"
import StoreDetailContent from "../../components/page/nanmo/StoreDetailContent"

const StoreDetail = () => {
  return (
    <div>
      <Header />
      <Wrapper className="min-h-screen flex flex-col max-w-[850px] mt-16">
        <StoreDetailContent />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default StoreDetail
