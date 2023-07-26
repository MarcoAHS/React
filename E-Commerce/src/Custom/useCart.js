import { useContext } from "react";
import { CartContext } from "../context/cart";
export function useCart() {
    const { cart, setCart, total, setTotal } = useContext(CartContext);
    const removeCart = () => {
        setCart([]);
        setTotal(0);
    }
    const removeFromCart = product => {
        const cantidad = cart.filter(item => item.id === product.id)[0].quantity
        setCart(prevState => prevState.filter(item => item.id !== product.id))
        setTotal(total - (product.price * cantidad))
    }
    const addToCart = product => {
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        setTotal(total + product.price)
        if(productInCartIndex >= 0){
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }
    const checkProductInCart = product => {
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        return (productInCartIndex >= 0) ? true : false
    }
    return { cart, removeCart, addToCart, removeFromCart, checkProductInCart, total }
}