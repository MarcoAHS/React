import { useCart } from '../Custom/useCart';
import './Footer.css';

export function Footer() {
    const { total } = useCart();
    return(
        <footer className='footer'>
            <h4>Marco Antonio - <span>Prueba Tecnica</span></h4>
            <h3>Total de Compra ${total}</h3>
        </footer>
    )
}