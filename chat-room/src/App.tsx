import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./page/homePage/home/home"
import MainChatPage from "./page/roomChat/mainPage/mainChatPg"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<MainChatPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
