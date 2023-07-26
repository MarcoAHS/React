import falseResponse from '../response/false.json'
import { useRef, useState } from 'react';
const URL = `https://www.omdbapi.com/?i=tt3896198&apikey=661c612d&s=`;
export function useMovie({ search }) {
    const [ responseMovies, setResponseMovies ] = useState([]);
    const previo = useRef(search);
    const movies = responseMovies.Search;
    const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    tittle: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))
  const getMovies = ({ search }) => {
    if(search && search.length > 2){
      if(previo.current !== search){
        fetch(`${URL}${search}`)
        .then(response => response.json())
        .then(respuesta => setResponseMovies(respuesta))
        previo.current = search
      }
    } else {
      setResponseMovies(falseResponse)
    }
  }
  return { movies: mappedMovies, getMovies }
}