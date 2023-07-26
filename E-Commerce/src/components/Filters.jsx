import { useId } from 'react';
import './Filters.css';
import { useFilters } from '../Custom/useFilters';
export function Filters() {
    const { filters, setFilters } = useFilters()
    const minPriceFilterID = useId();
    const categoryFilterID = useId();
    const handleChangeMinPrice = (event) => {
        setFilters(previus => ({
            ...previus,
            minPrice: event.target.value
        }))
    }
    const handleChangeCategory = (event) => {
        setFilters(previus => ({
            ...previus,
            category: event.target.value
        }))
    }
    return(
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterID}>Price</label>
                <input onChange={handleChangeMinPrice} type="range" id={minPriceFilterID} value={filters.minPrice} min='0' max='1400'/>
                <span>{filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterID}>Categoria</label>
                <select onChange={handleChangeCategory} id={categoryFilterID}>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}