import { useEffect, useMemo, useState } from 'react'
import './App.css'

export function App() {
  const [ servants, setServants ] = useState([])
  const [ page, setPage ] = useState(1)
  useEffect(() => {
    fetch('https://api.atlasacademy.io/export/NA/basic_servant.json')
    .then(res => res.json())
    .then(result => setServants(result))
  }, [])
  const filteredServants = useMemo(() => {
    return servants.slice(0, 5*page)
  }, [page, servants])
  return (
    <>
      <div className='servants'>
    {
      filteredServants.map(servant => {
        return(
          <div key={servant.id} className='servant'>
            <h3>
              {servant.rarity}
              <i className="fa-solid fa-star" style={{color: "#fbff00"}}></i>
              <p>{servant.className.charAt(0).toUpperCase()}{servant.className.slice(1)}</p>
            </h3>
            <img src={servant.face} alt={servant.name} />
            <p>{servant.name}</p>
            <div className='attributes'>
              <p>Max Atk: {servant.atkMax}</p>
              <p>Max Hp: {servant.hpMax}</p>
            </div>
          </div>
        )
      })
    }
    </div>
    <button onClick={() => setPage(page + 1)}>Cargar Mas + </button>
    </>
  )
}
