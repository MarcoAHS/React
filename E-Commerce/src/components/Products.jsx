import { useCart } from '../Custom/useCart.js'
import { AddToCartIcon } from './Icons.jsx'
import './Products.css'
export function Item({ title, price, thumbnail, updateCart, isProductInCart }) {
    return (
        <li>
        <img width={300} height={300} src={thumbnail} alt={title} />
            <div>
                <h2>{title}</h2>
                <h3>Precio - ${price}</h3>
                <button style={{ backgroundColor: isProductInCart ? 'red' : '#09f'}} onClick={updateCart}>
                    <AddToCartIcon/>
                </button>
            </div>
        </li>
    )
}
export function Products ({ products }) {
    const { addToCart, checkProductInCart, removeFromCart } = useCart()
    return (
        <main className='productos'>
            <ul>
                {products.map(product => {
                    const isProductInCart = checkProductInCart(product)
                    return(
                    <Item 
                    key={product.id} 
                    updateCart={() => {
                        isProductInCart
                        ? removeFromCart(product)
                        : addToCart(product)
                    }}
                    {...product}
                    isProductInCart={isProductInCart}/>
                )}
                )}
            </ul>
        </main>
    )
}