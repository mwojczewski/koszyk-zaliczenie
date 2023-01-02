import { Button, Container, Nav, Navbar as BNavbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
function Navbar() {

    const {cartOpen, cartQty} = useCart();
  return (
    <BNavbar sticky="top"  bg="light"  variant="light" className="shadow-sm">
        <Container>
        <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                </svg>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sklep">
                Sklep
            </Nav.Link>
            <Nav.Link as={NavLink} to="/o-mnie">
                O mnie
            </Nav.Link>
        </Nav>
        <Button variant={cartQty <= 0 ? "muted" : "primary"} className="position-relative me-3" onClick={cartOpen} disabled={cartQty <= 0}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="total-count">{cartQty > 0 ? cartQty : null}</span>
        </Button>
        </Container>
    </BNavbar>
  )
}

export default Navbar