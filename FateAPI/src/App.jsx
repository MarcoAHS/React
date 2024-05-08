import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ImageList, ImageListItemBar, ImageListItem, Button, IconButton, Box, FormGroup, FormControlLabel, Switch,
          AppBar, Toolbar, Typography, Menu, MenuItem, Backdrop, CircularProgress, Accordion, AccordionSummary,
          AccordionDetails, Fade, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LineChart } from '@mui/x-charts/LineChart';

const API_URL = "https://api.atlasacademy.io/export/NA/basic_servant.json";
const Main_Color = "#1976d2";

export function App() {
  const [ servants, setServants ] = useState([])
  const [ page, setPage ] = useState(1)
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [abrir, setabrir] = useState(false);
  const [data, setData] = useState([[0, 1, 2, 3], [0, 1, 2, 1]])

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
    for(let i = 1; i < 200; i++){
        const color = colors[Math.floor(Math.random() * colors.length)]
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBackDropClose = () => {
    setOpen(false);
  };
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
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
    .then(result => setServants(result))
  }, [])
  const filteredServants = useMemo(() => {
    if(page > 1) {
      loading()
    }
    return servants.slice(0, 9*page)
  }, [page, servants])
  return (
    <div className='contenedor'>
      <div className="space space-1"></div>
      <div className="space space-2"></div>
      <div className="space space-3"></div>
      <Box sx={{ flexGrow: 1, width: "111%", marginBottom: 5, zIndex: 2 }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Muestra - Marco Antonio - Echa con React y MUI Components
          </Typography>
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
      <div className='contenido'>
        <div>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {filteredServants.map((servant) => (
            <ImageListItem key={servant.id}>
              <img
                srcSet={`${servant.face}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${servant.face}?w=164&h=164&fit=crop&auto=format`}
                alt={servant.name}
                loading="lazy"
              />
              <ImageListItemBar
              title={servant.name}
              subtitle={servant.className.charAt(0).toUpperCase() + servant.className.slice(1)}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${servant.name}`}
                >
                  
                </IconButton>
              }
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
        <div className='acordion' style={{ marginTop: "20px" }}>
        <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
          backgroundColor: Main_Color, color: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography><spam>Paso#1</spam> para la Realizacion de este Proyecto</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Realizar la llamada a la API abierta del Vieojuego de Celulares Fate GO
          </Typography>
        </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#2</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Usando la estructura del JSON obtenido de la API "{API_URL}", de desplego en pantalla usando un pequeño componente
              echo para la ocacion (Utilizando React)
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#3</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Una vez mostrando los datos en pantalla me parecieron demasiados para mostrarlos de una vez, sobre todo
              si el objetivo de la Aplicacion era mas que solo poder visualizarlos, asi que hice una acotacion de los datos
              despues de realizar la llamada
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#4</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Agrege la opcion de cargar mas datos con una variable de "Bandera" para incrementar la acotacion realizada antes
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#5</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Una vez echo esto, con el uso de Componentes de Codigo abierto de React (MUI Components) implemente
              una barra de navegacion y los datos con los que trabajaba usando un componente personal, los adapte para usar un Componente
              de MUI
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#6</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Despues implemente un Backdrop como animacion de Carga para mejorar un poco la sensasion de Estados como usuario
              la Aplicacion y usando de nuevo componentes de MUI Components realice esta lista
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#7</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lo siguiente en la Lista fue desplegar un Menu Lateral para agregar una nueva funcion a la Aplicacion
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#8</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A continuacion, haciendo uso de Javascript Nativo, realice un fondo con 
              animado utilizando Keyframes y generando puntos aleatorios en la parte de 
              atras de la Aplicacion
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: Main_Color, color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography><spam>Paso#9</spam> para la realizacion de este Proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lo siguiente fue agregar una Grafia Lineal y agregarle la opcion para que el usuario pudiera interactuar
              con ella y modificar el contenido en tiempo real
            </Typography>
          </AccordionDetails>
        </Accordion>
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
              Al tener acceso a Componentes y a la API que utilice para el Album de imagenes de antemano tarde 2 dias
              en la realizacion de este Proyecto, sin contar luego hacer algun Test y el Despliegue posterior.
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>
      </div>
      <div style={{ marginTop: 100, color: "white" }} className='contenido'>
        <div>
        <h2>Grafica Linear</h2>
          <LineChart
            sx={{backgroundColor: Main_Color}}
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
            width={700}
            height={500}
          />
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: "block", width: 600}}>
            <h2>Agregar Datos a la Grafica</h2>
              <TextField name='X' type='number' sx={{ marginRight: "10px", backgroundColor: "white", opacity: 0.4}} id="X" label="X: " variant="outlined" />
              <TextField name='Y' type='number' sx={{ backgroundColor: "white", opacity: 0.4}} id="Y" label="Y: " variant="outlined" />
          </div>
          <Button type='submit' variant="contained">Agregar</Button>
        </Box>
      </div>
    </div>
  )
}
