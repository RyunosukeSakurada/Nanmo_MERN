import {Route,Routes} from "react-router-dom"
import TopPage from "./pages/TopPage/TopPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <TopPage />} />
      </Routes>
    </>
  )
}

export default App
