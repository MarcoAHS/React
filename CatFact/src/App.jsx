import { useEffect, useState } from 'react';
import './App.css'
import { useFact } from './hooks/useFact'
import { useGif } from './hooks/useGif';
const FACT_URL = 'https://catfact.ninja/fact';
const GIF_URL = 'https://api.giphy.com/v1/gifs/search?api_key=GyszoqCJC0CLyYUqY4j2T27qYxO742c1&limit=10&q=';
function App() {
  const { fact, updateFact } = useFact();
  const { gif, updateGif } = useGif();
  const [ random, setRandom ] = useState(0);
  useEffect(() => {
    fetch(FACT_URL)
    .then(response => response.json())
    .then(result => {
      updateFact(result.fact)
    })
  }, [])
  useEffect(() => {
    if(!fact) return
    fetch(GIF_URL + fact.split(' ').slice(0, 3).join(' '))
    .then(response => response.json())
    .then(result => updateGif(result.data))
  }, [fact])
  function getRandomInt() {
    return Math.floor(Math.random() * 10);
  }
  
  return (
    <main className='main'>
      <div onClick={() => setRandom(getRandomInt())} className='fact'>
        <h1>Fact de Gatos con Giphy</h1>
        <div>{fact}</div>
      </div>
      <div>
        { gif && <img src={gif[random].images.original.url} alt="Gif de Giphy" />}
      </div>
    </main>
  )
}

export default App
