import { Button, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import products from "../storage/products.json"


type CartEntryProps = {
    id: number
    qty: number
}

function CartEntry({id, qty}: CartEntryProps) {
    const {increaseQty, decreaseQty} = useCart();
    const entry = products.find(product => product.id === id)

    const pricetag = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(entry!.promo_price > 0 ? entry!.promo_price : entry!.normal_price)
    const priceSum = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format((entry!.promo_price > 0 ? entry!.promo_price : entry!.normal_price) * qty)
    if (entry === null)
        return null
  
    return (
        <Stack direction="horizontal" gap={2}>
            <img src={entry!.image} className="cart-image" />
            <div className="me-auto">
                {entry!.name}<br/>
                <span className="text-muted">
                    <Button variant="primary" onClick={() => decreaseQty(id)} size="xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                        </svg>
                    </Button>
                    <span className="ms-1 me-1">{qty}</span>
                    <Button variant="primary" onClick={() => (entry!.stock_limit == -1 || qty < entry!.stock_limit) ? increaseQty(id) : null} disabled={entry!.stock_limit != -1 && qty >= entry!.stock_limit} size="xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                    </Button>&nbsp;
                    x {pricetag}</span>
            </div>
            <div>
                {priceSum}
            </div>
        </Stack>
    )
}

export default CartEntry