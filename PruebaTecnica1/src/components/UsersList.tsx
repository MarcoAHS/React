import { SortBy, type Users } from '../types/types.ts'
interface Props {
    users: Users[],
    showColors: boolean,
    deleteUser: (email: string) => void
    handleSort: (sort: SortBy) => void
}
export function UsersList({ users, showColors, deleteUser, handleSort }: Props){
    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className='row' onClick={() => handleSort(SortBy.NAME)}>Nombre</th>
                    <th className='row' onClick={() => handleSort(SortBy.LAST)}>Apellido</th>
                    <th className='row' onClick={() => handleSort(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundcolor = (index%2 === 0) ? '#333' : '#555'
                        const color = showColors ? backgroundcolor : 'transparent' 
                        return(
                            <tr style={{backgroundColor: color}} key={user.email}>
                                <td>
                                    <img src={user.picture.large} alt="Foto" />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.email)}>Eliminar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}