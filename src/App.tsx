import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"
import { CartProvider } from "./context/CartContext"
import { FilterProvider } from "./context/FilterContext"


function App() {
  return (
    <FilterProvider>
      <CartProvider>
          <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sklep" element={<Store />} />
            <Route path="/o-mnie" element={<About />} />
          </Routes>
        </Container>
      </CartProvider>
    </FilterProvider>
  )
}

export default App
