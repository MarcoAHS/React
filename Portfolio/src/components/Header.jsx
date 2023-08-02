import './Header.css'
function Icono({ icono, level }){
    return(
        <div className={level}>
            <i className={icono}></i>
            <p>{level}</p>
        </div>
    )
}
function GitHub() {
    return (
        <div className='repositorio'>
            <i className="fa-brands fa-square-github fa-2xl"></i>
            <a href="https://github.com/MarcoAHS">Mi GitHub</a>
        </div>
    )
}
function Linkedin() {
    return (
        <div className='repositorio'>
            <i className="fa-brands fa-linkedin fa-2xl"></i>
            <a href="https://www.linkedin.com/in/marco-antonio-4093451a0/">Mi Linkedin</a>
        </div>
    )
}
export function Header() {
    const iconos = [
        {
            id: 1,
            icono: 'fa-brands fa-php fa-beat fa-2xl',
            level: 'Completo'
        },
        {
            id: 2,
            icono: 'fa-brands fa-html5 fa-beat fa-2xl',
            level: 'Completo'
        },
        {
            id: 3,
            icono: 'fa-brands fa-css3-alt fa-beat fa-2xl',
            level: 'Bueno'
        },
        {
            id: 4,
            icono: 'fa-solid fa-database fa-beat fa-2xl',
            level: 'Bueno'
        },
        {
            id: 5,
            icono: 'fa-brands fa-square-js fa-beat fa-2xl',
            level: 'Bueno'
        },
        {
            id: 6,
            icono: 'fa-brands fa-react fa-beat fa-2xl',
            level: 'Bueno'
        }
    ]
    return(
    <div className='descripcion'>
        <div className='header'>
            <img style={{ height: 150, width: 150}} src="/src/assets/Profile.jpg" alt="Foto de Perfil" />
            <div className='nombre'>
                <h1>Marco Antonio Hernandez Solis</h1>
                <div className='redes'>
                    <GitHub />
                    <Linkedin/>
                </div>
            </div>
        </div>
        <p>Recien Egresado de Licenciatura en Ciencias Computacionales</p>
        <p>Desarrollador Web con conocimientos en los siguientes Lenguajes/FrameWorks</p>
        <ul className="iconos">
            {
                iconos.map(icono => {
                    return (
                        <Icono key={icono.id} icono={icono.icono} level={icono.level} />
                    )
                })
            }
        </ul>
    </div>
    )
}