import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ImageList, ImageListItemBar, ImageListItem, Button, IconButton, Box, FormGroup, FormControlLabel, Switch,
          AppBar, Toolbar, Typography, Menu, MenuItem, Backdrop, CircularProgress, Accordion, AccordionSummary,
          AccordionDetails, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, 
          useMediaQuery} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LineChart } from '@mui/x-charts/LineChart';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
const Main_Color = "#1976d2";
const Pasos = 
['Realizar la llamada a la API abierta de Cocktails para obtener informacion para la galeria de imagenes', 
 'Usando la estructura del JSON obtenido de la API "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail", de desplego en pantalla usando un pequeño componente echo para la ocacion (Utilizando React)',
 'Una vez mostrando los datos en pantalla me parecieron demasiados para mostrarlos de una vez, sobre todo si el objetivo de la Aplicacion era mas que solo poder visualizarlos, asi que hice una acotacion de los datos despues de realizar la llamada',
 'Agrege la opcion de cargar mas datos con una variable de "Bandera" para incrementar la acotacion realizada antes',
 'Una vez echo esto, con el uso de Componentes de Codigo abierto de React (MUI Components) implemente una barra de navegacion y los datos con los que trabajaba usando un componente personal, los adapte para usar un Componente de MUI',
 'Despues implemente un Backdrop como animacion de Carga para mejorar un poco la sensasion de Estados como usuario la Aplicacion y usando de nuevo componentes de MUI Components realice esta lista',
 'Lo siguiente en la Lista fue desplegar un Menu Lateral para agregar una nueva funcion a la Aplicacion',
 'A continuacion, haciendo uso de Javascript Nativo, realice un fondo con animado utilizando Keyframes y generando puntos aleatorios en la parte de atras de la Aplicacion',
 'Lo siguiente fue agregar una Grafia Lineal y agregarle la opcion para que el usuario pudiera interactuar con ella y modificar el contenido en tiempo real',
 'El siguiente paso fue añadir el diseño para celular, ya que en resolucion menor a 1250px el conenido no alcanzaba a visualizarse',
 'Despues, esta misma lista la habia empezado manualmente cada elemento, para hacer mas sencilla la actualizacion de la misma, y facilitar la reutilizacion, la re-factorice para poder generar una nueva solo agregando una partida al Array'
];
const Proyectos = [
  {
    id: 1,
    name : "Blog de Cafe",
    url: "https://boisterous-monstera-868e0e.netlify.app/",
    img: "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/63bf54554e8ceb5b4c5ba3c1/screenshot_2023-01-12-00-29-11-0000.png&fit=cover&h=500&w=800",
    tecnologias: ['PHP', 'Javascript', 'Css', 'HTML'],
    color: '#784d3c'
  },
  {
    id: 2,
    name : "Rock Festival",
    url: "https://beamish-florentine-cc62ea.netlify.app/",
    img: "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/63df255c6a21a8146d0b1147/screenshot_2023-02-05-03-41-18-0000.png&fit=cover&h=500&w=800",
    tecnologias: ['PHP', 'Javascript', 'Css', 'HTML'],
    color: "#4cb8b3"
  },
  {
    id: 3,
    name : "Pagina Muestra",
    url: "https://lucent-bublanina-a2ba53.netlify.app/",
    img: "https://app.netlify.com/.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/6642738e8bcc901e21a3409f/screenshot_2024-05-13-20-09-52-0000.webp&fit=cover&h=500&w=800",
    tecnologias: ['ReactJS', 'Javascript', 'Css', 'HTML', 'API', 'MUI', 'ViteJS'],
    color: "#1976d2"
  }
];
export function App() {
  const [ cocktail, setCocktail ] = useState([])
  const [ page, setPage ] = useState(1)
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [abrir, setabrir] = useState(false);
  const [data, setData] = useState([[0, 1, 2, 3], [0, 1, 2, 1]])
  const Mobile = useMediaQuery('(max-width: 1250px)')
  const toggleDrawer = (newabrir) => () => {
    setabrir(newabrir);
  };
  function loading(){
    setOpen(true)
    setTimeout(function(){
      setOpen(false)
    }, 500);
  }
  const generateSpace = (selector, size, duration) => {
    const colors = ["#fff2", "#fff4", "#fff7", "#fffc"];
    const layer = [];
    for(let i = 1; i < 500; i++){
        const color = colors[Math.floor(Math.random() * colors.length)]
        const x = Math.floor(Math.random() * 300);
        const y = Math.floor(Math.random() * 300);
        layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}, ${x}vw ${y + 200}vh 0 ${color}`);
    }
    const container = document.querySelector(selector);
    container.style.setProperty("--space-layer", layer.join(","));
    container.style.setProperty("--size", size);
    container.style.setProperty("--duration", duration);
}
  const handleChange = (event) => {
    setAuth(event.target.checked);
    loading()
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCV = () => {
    const link = document.createElement("a");
    link.download = `CV.pdf`;
    link.href = "assets/CV.pdf";
    link.click();
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBackDropClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { elements } = event.currentTarget
    const X = elements.namedItem('X').value;
    const Y = elements.namedItem('Y').value;
    setData((prevState) => {
      return [[...prevState[0], X], [...prevState[1], Y]]
    })
    loading()
  }
  const DrawerList = (
    <Box sx={{ width: 250, height: "100%" , backgroundColor: Main_Color, color: "white" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon sx={{color: "white"}} /> : <MailIcon sx={{color: "white"}} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  useEffect(() => {
    generateSpace(".space-1", "1px", "25s")
    generateSpace(".space-2", "2px", "20s")
    generateSpace(".space-3", "4px", "15s")
    fetch(API_URL)
    .then(res => res.json())
    .then(result => setCocktail(result["drinks"]))
  }, [])
  const filteredCocktails = useMemo(() => {
    if(page > 1) {
      loading()
    }
    return cocktail.slice(0, 9*page)
  }, [page, cocktail])
  return (
    <div className='contenedor'>
      <div className="space space-1"></div>
      <div className="space space-2"></div>
      <div className="space space-3"></div>
      <Box sx={{ flexGrow: 1, width: "100%", zIndex: 2, position: 'fixed', top: 0, left: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Drawer open={abrir} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          {!Mobile && 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Muestra - Marco Antonio - Echa con React y MUI Components
          </Typography>}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      </Box>
      <div className='main'>
      <div className='contenido'>
        <div>
          <ImageList sx={{ width: Mobile ? 350 : 550, height: 450, margin: "20px auto" }} cols={3} rowHeight={164}>
          {filteredCocktails.map((cocktail) => (
            <ImageListItem key={cocktail.idDrink}>
            <img
              srcSet={`${cocktail.strDrinkThumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${cocktail.strDrinkThumb}?w=164&h=164&fit=crop&auto=format`}
              alt={cocktail.strDrink}
              loading="lazy"
            />
            <ImageListItemBar
            title={cocktail.strDrink}
            subtitle={cocktail.idDrink}
          />
        </ImageListItem>
        ))}
          </ImageList>
          <Button style={{margin: "16px"}} variant="contained" onClick={() => setPage(page + 1)}>Cargar Mas</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleBackDropClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
        <div className='acordion' style={{ width: Mobile ? 350 : 650, margin: Mobile ? "40px auto" : "20px auto" }}>
        {Pasos.map((message, index) => (
          <Accordion key={index + 1} sx={{ backgroundColor: Main_Color, color: "white" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography><spam>Paso#{index + 1} para la Realizacion de este Proyecto</spam></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {message}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Duracion del Proyecto</spam></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Al tener acceso a Componentes y a la API que utilice para el Album de imagenes de antemano tarde 5 dias
              en la realizacion de este Proyecto, refactorizacion, y funcionalidad sin contar luego hacer algun Test y el Despliegue posterior.
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>
      </div>
      <div style={{ marginTop: 100, color: "white" }} className='contenido'>
        <div className='grafica'>
        <h2>Grafica Linear</h2>
          <LineChart
            sx={{backgroundColor: Main_Color, borderRadius: 10}}
            xAxis={[{ data: data[0] }]}
            yAxis={[{
              colorMap: {
                type: 'continuous',
                min: -10,
                max: 10,
                color: ["white", Main_Color],
              }
            }]}
            series={[
              {
                data: data[1],
              },
            ]}
            width={Mobile ? 350 : 600}
            height={Mobile ? 400 : 600}
          />
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: "block", width: 600}}>
            <h2>Agregar Datos a la Grafica</h2>
              <div className='campos'>
                <TextField name='X' type='number' sx={{ backgroundColor: "white", opacity: 0.4}} id="X" label="X: " variant="outlined" />
                <TextField name='Y' type='number' sx={{ backgroundColor: "white", opacity: 0.4}} id="Y" label="Y: " variant="outlined" />
              </div>
          </div>
          <Button type='submit' variant="contained">Agregar</Button>
        </Box>
      </div>
      <h2>+Proyectos</h2>
      <div className='contenido proyectos'>
        {Proyectos.map((proyecto) => (
          <div style={{ backgroundColor: proyecto.color }} className='proyecto' key={proyecto.id}>
            <a href={proyecto.url} target='_blank' rel="noreferrer">
              <img src={proyecto.img} alt={"Proyecto Numero#" + proyecto.id} />
            </a>
            <div className='tecs'>
              {proyecto.tecnologias.map((tec,i) => (
                <p style={{ color: proyecto.color}} className='tec' key={i}>{tec}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
      <div style={{margin: "20px auto"}} className='contenido cv'>
        <h2>Por ultimo, puedes descargar mi Curriculum, espero tu llamada!</h2>
        <Button onClick={handleCV} style={{width: '300px', height: '60px'}} variant="contained" startIcon={<AttachFileIcon />}>
          Descargar CV
        </Button>
      </div>
    </div>
  )
}
