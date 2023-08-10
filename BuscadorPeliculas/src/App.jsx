import { useCallback, useState } from 'react';
import './App.css'
import { Movies } from './components/Movies';
import { useMovie } from './hooks/useMovie';
import { useEffect } from 'react';
import debounce from "just-debounce-it";
function App() {
  const [ busqueda ] = useState('');
  const { movies, getMovies } = useMovie({ search: busqueda });
  const [ error, setError ] = useState('');
  const moviesDebounce = debounce((search) => {
    getMovies({ search })
  }, 1000)
  const handleChange = useCallback((event) => {
    const search = event.target.value
    moviesDebounce(search)
  }, [busqueda])
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search: busqueda })
  }
  useEffect(() => {
    if(busqueda === ''){
      setError("Busqueda Vacia")
      return
    }
    if(busqueda.length < 3){
      setError("Ingresa al Menos 3 letras")
      return
    }
    setError('')
  }, [busqueda])
  return (
    <div className='page'>
      <header>
        <h1>Movie Finder</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='search' placeholder='Find Your Movie' type="text" />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </header>
      <main>
        <h1>Resultados</h1>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
