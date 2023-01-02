import { createContext, ReactNode, useContext, useState } from "react";
import Filters from "../components/Filters";
import ShoppingCart from "../components/ShoppingCart"


type CartProviderProps = {
    children: ReactNode
}

type CartContextProps = {
    cartOpen: () => void
    cartClose: () => void
    getQty: (id: number) => number
    increaseQty: (id: number) => void
    decreaseQty: (id: number) => void
    cartQty: number
    cartItem: CartItem[]
}

type CartItem = {
    id: number
    qty: number
}

const CartContext = createContext({} as CartContextProps)

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({children}: CartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItem, setCartItem] = useState<CartItem[]>([])

    const cartQty = cartItem.reduce((qty, item) => item.qty + qty, 0)
    const cartOpen = () => setIsOpen(true)
    const cartClose = () => setIsOpen(false)
    
    function getQty(id: number) {
        return cartItem.find(item => item.id === id)?.qty || 0; 
    }

    function increaseQty(id: number) {
        setCartItem(currItems => {
            if (currItems.find(item => item.id === id) == null)
                return [...currItems, {id, qty: 1}]
            else 
                return currItems.map(item => {
                    if (item.id === id)
                        return {...item, qty: item.qty + 1}
                    else
                        return item
                })
        })
    }

    function decreaseQty(id: number) {
        setCartItem(currItems => {
            if (currItems.find(item => item.id === id)?.qty === 1)
                return currItems.filter(item => item.id !== id)
            else
                return currItems.map(item => {
                    if (item.id === id)
                        return {...item, qty: item.qty - 1}
                    else
                        return item
                })
        })
    }

    return (
    <CartContext.Provider value={{getQty, increaseQty, decreaseQty, cartItem, cartOpen, cartClose, cartQty}}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>)
}