import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Curriculum } from './components/Curriculum'
import { Certificados } from './components/Certificados'

function App() {
  const [ mousePosition, setMousePosition ] = useState({
    x: 0, 
    y: 0
  })
  useEffect(() => {
    const updatePosition = (event) => {
      const positions = {
        x: event.clientX,
        y: event.clientY
      }
      setMousePosition(positions)
    }
    window.addEventListener('mousemove', updatePosition)
    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [])
  return (
    <main className='portfolio'>
      <Header/>
      <div style={{left: mousePosition.x, top: mousePosition.y}} className='cursor'></div>
      <Certificados/>
      <Curriculum/>
    </main>
  )
}

export default App
