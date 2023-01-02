import { Button, Col, Offcanvas, Row, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartEntry from "./CartEntry";
import products from "../storage/products.json"


type ShoppingCartProps = {
    isOpen: Boolean
}

function ShoppingCart({isOpen}: ShoppingCartProps) {

    const {cartClose, cartItem} = useCart()

    let standard_price = cartItem.reduce((total, cartItem) => {
        const item = products.find(i => i.id === cartItem.id)
        return total + (item!.normal_price * cartItem.qty)
    }, 0)

    let saving = cartItem.reduce((total, cartItem) => {
        const item = products.find(i => i.id === cartItem.id)
        return total + ((item!.promo_price > -1 ? item!.normal_price - item!.promo_price : 0) * cartItem.qty)
    }, 0)

    let total = cartItem.reduce((total, cartItem) => {
        const item = products.find(i => i.id === cartItem.id)
        return total + ((item!.promo_price > -1 ? item!.promo_price : item!.normal_price) * cartItem.qty)
    }, 0)

  return (
   <Offcanvas show={isOpen} onHide={cartClose} placement="end">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Twój koszyk</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Stack gap={2}>
            {cartItem.map(item => (
                <CartEntry key={item.id} {...item} />
            ))}
        </Stack>
    </Offcanvas.Body>
    <div className="shoppingCartFooter">
        <Stack gap={2} className="fs-6 text-end me-2 ms-3">
            <Row>
                <Col className="text-end border-top">Łącznie:</Col>
                <Col className="text-end border-top fw-bold">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(standard_price)}</Col>
            </Row>
            <Row>
                <Col className="text-end">Suma rabatów:</Col>
                <Col className="text-end fw-bold">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(saving)}</Col>
            </Row>
            <Row>
                <Col className="text-end fs-5 fw-bold">Do zapłaty:</Col>
                <Col className="text-end fs-5 fw-bold">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(total)}</Col>
            </Row>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <Button type="button" variant="primary" className="w-75 text-center">
                    Przejdź do płatności&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </Button>
            </div>
        </Stack>
    </div>
   </Offcanvas>
  )
}

export default ShoppingCart