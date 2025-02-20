import { Container, Typography, Box } from '@mui/material';
import logo_xiris from "./assets/logo_xiris_ac.png";
import residenza_logo from "./assets/residenza_logo.jpg";
import MudanzasForm from './tag_playas_conchal_form';

function App() {
  return (
    <Container className="App">
      {/* Contenedor de los logos */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "10px 0"
        }}
      >
        <img 
          src={residenza_logo} 
          alt="Residenza Logo" 
          style={{ maxWidth: "80px", height: "auto" }} 
        />
        <img 
          src={logo_xiris} 
          alt="Xiris Logo" 
          style={{ maxWidth: "80px", height: "auto" }} 
        />
      </Box>

      {/* Contenido principal */}
      <header className="App-header">
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            color: '#262161', 
            fontSize: { xs: "1.2rem", sm: "1.7rem" }, 
            fontWeight: "bold",
            mb: 2 // Espacio entre los logos y el título
          }}
        >
          Solicitud de Tag, Playas del Conchal.
        </Typography>
        <Typography sx={{ color: '#262161', mt: 2 }}>
          Por favor llena los campos y carga una imagen de tu INE y tarjeta de circulación. Descarga el pdf con el botón al final de la página y compártela al administrador del condominio.
        </Typography>
      </header>
      <MudanzasForm />
    </Container>
  );
}

export default App;
