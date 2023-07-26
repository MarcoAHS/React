import { useId } from 'react';
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons';
import './Cart.css';
import { useCart } from '../Custom/useCart';
export function Item({ title, price, thumbnail, quantity, removeFromCart, addToCart }) {
    return (
    <li>
        <img src={thumbnail} alt={title} />
        <div>
            <strong>{title} - ${price}</strong>
        </div>
        <footer>
            <small>
                {quantity}
            </small>
            <button onClick={addToCart}>+</button>
        </footer>
        <button onClick={removeFromCart}>
            <RemoveFromCartIcon />
        </button>
    </li>
    )
}
export function Cart() {
    const { cart, removeCart, addToCart, removeFromCart, total } = useCart();
    const cartCheckBoxId = useId()
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckBoxId}>
                <CartIcon/>
            </label>
            <input hidden type="checkbox" name="" id={cartCheckBoxId} />
            <aside className='cart'>
                <ul>
                    {cart.map(product => (
                        <Item
                        key={product.id}
                        addToCart={() => addToCart(product)} 
                        removeFromCart={() => removeFromCart(product)}
                        {...product} />
                    ))}
                </ul>
                <button onClick={removeCart}>
                    <ClearCartIcon/>
                </button>
                <h2>Total - {
                    (total > 0) && (total)
                }</h2>
            </aside>
        </>
    )
}