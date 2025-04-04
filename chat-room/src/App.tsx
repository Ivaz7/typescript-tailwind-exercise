import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./page/homePage/home/home"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
