import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy, type Users } from './types/types.ts'

function App() {
  const [ users, setUsers ] = useState<Users[]>([])
  const [ showColors, setShowColors ] = useState<boolean>(false)
  const [ sortBy, setSortBy ] = useState<SortBy>(SortBy.NONE)
  const [ filterCountry, setFilterCountry ] = useState<string | null>(null)
  const original = useRef<Users[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ page, setPage ] = useState<number>(1)
  const handleDelete = (email: string) => {
    const array = users.filter(user => {
       return user.email !== email
    })
    setUsers(array)
  }
  const changeColors = () => {
    setShowColors(!showColors)
  }
  const changeOrder = () => {
    sortBy === 'none'
    ? setSortBy(SortBy.COUNTRY)
    : setSortBy(SortBy.NONE)
  }
  const handleReset = () => {
    setUsers(original.current)
  }
  const handleSort = (sort: SortBy) => {
    sortBy === sort
    ?setSortBy(SortBy.NONE)
    :setSortBy(sort)
  }
  useEffect(() => {
    setLoading(true)
    fetch(`https://randomuser.me/api/?results=10&seed=react&page=${page}`)
      .then(response => response.json())
      .then(result => {
        const newUsers = users.concat(result.results)
        setUsers(newUsers)
        original.current = newUsers
      })
      .catch(err =>{
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])
  const filteredUsers = useMemo(() => {
    return filterCountry?users.filter((user) => { return user.location.country.toLowerCase().includes(filterCountry.toLocaleLowerCase()) }):users
  }, [users, filterCountry])
  const sortedUsers = useMemo(() => {
    if(sortBy === SortBy.COUNTRY) return [...filteredUsers].sort((a, b) => { return a.location.country.localeCompare(b.location.country)})
    if(sortBy === SortBy.NAME) return [...filteredUsers].sort((a, b) => { return a.name.first.localeCompare(b.name.first)})
    if(sortBy === SortBy.LAST) return [...filteredUsers].sort((a, b) => { return a.name.last.localeCompare(b.name.last)})
    return filteredUsers
  }, [sortBy, filteredUsers])
  return (
    <div className='app'>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={changeColors}>Colorear Filas</button>
        <button onClick={changeOrder}>Ordenar por Paises</button>
        <button onClick={handleReset}>Resetear Lista</button>
        <input type="text" placeholder='Filtrar por Pais' onChange={(e) => { setFilterCountry(e.target.value)}}/>
      </header>
      <main>
        {sortedUsers.length > 0 && <UsersList handleSort={handleSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>}
        {loading && <p>Cargando...</p>}
        <button onClick={() => setPage(page + 1)}>Cargar mas Usuarios</button>
      </main>
    </div>
  )
}

export default App
