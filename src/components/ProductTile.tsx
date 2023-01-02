import { Button, ButtonGroup, Card, CardImg } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import PriceTag from "./PriceTag"

type ProductDataProp = {
    id: number,
    category: string,
    name: string,
    description: string,
    normal_price: number,
    promo_price: number,
    stock_limit: number,
    image: string 
}

function ProductTile({id, category, name, description, normal_price, promo_price, stock_limit, image}: ProductDataProp) {
    const {getQty, increaseQty, decreaseQty} = useCart();
    let qty:number = getQty(id)
  return (
    <Card className="h-100">
        <Card.Img variant="top" src={image} height="250px" className="ProductTileImage"/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between mb-3">
                <span className="text-truncate">{name}</span>
                <span className="ms-2"><PriceTag normal={normal_price} promo={promo_price} /></span>
            </Card.Title>
            <Card.Text>
                {stock_limit > -1 ? (<><div className="badge text-bg-danger mb-3">Tylko {stock_limit} szt na stanie!</div><br/></>) : ""}
                {description}
            </Card.Text>
            <div className="mt-auto">
            {qty > 0 ? 
            (<div className="d-flex align-items-center flex-column">
                <div className="d-flex justify-content-center align-items-center g-2">
                    <ButtonGroup>
                        <Button variant="primary" onClick={() => decreaseQty(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                            </svg>
                        </Button>
                        <Button variant="muted" read-only>{getQty(id)} szt w koszyku</Button>
                        <Button variant="primary" onClick={() => (stock_limit == -1 || getQty(id) < stock_limit) ? increaseQty(id) : null} disabled={stock_limit != -1 && getQty(id) >= stock_limit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
                    
                </div>
            </div>)
            :
            (<Button className="w-100" variant="primary" onClick={() => (stock_limit == -1 || getQty(id) < stock_limit) ? increaseQty(id) : null}>+ Dodaj do koszyka</Button>)}
            </div>
        </Card.Body>
    </Card>
  )
}

export default ProductTile