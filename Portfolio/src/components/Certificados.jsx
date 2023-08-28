import './Certificados.css'
function Card({ url, title }) {
    return(
        <div className='card'>
            <i className="fa-solid fa-school fa-beat fa-2xl"></i>
            <div>
                <h2>{title}</h2>
                <a href={url}>Plan de Estudios/Certificado</a>
            </div>
        </div>
    )
}
export function Certificados() {
    const certificados = [ 
        {
            name: 'Licenciatura en Ciencias Computacionales (En Porceso de Titulacion) (2017 - 2022)',
            url: 'https://www.uanl.mx/oferta/licenciado-en-ciencias-computacionales/'
        },
        {
            name: 'Curso Ingles Vivencial (2018)',
            url: 'https://www.inglesvivencial.com.mx/plan-de-estudio/'
        },
        {
            name: 'Desarrollo Web Completo con HTML5, CSS3, JS, PHP, y MySQL (Finales 2022 - Inicios 2023)',
            url: 'https://www.udemy.com/certificate/UC-b5f7001a-e247-4f13-bc02-81bbcd61f8c5/'
        }
    ]
    return (    
        <div className='certificados'>
            <ul>
            <h1>Certificados</h1>
                {
                    certificados.map(certificado => {
                        return(
                            <li className="certificado">
                                <Card url={certificado.url} title={certificado.name} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}