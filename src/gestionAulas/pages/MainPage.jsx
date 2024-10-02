import { Box } from '@mui/material';
import MainPageImage from '../../assets/img/MainPageImage.png';
import { Header } from '../../components/Header/Header';


export const MainPage = () => {
  return (
  <>
    <Header/>
    <Box
      sx={{
        height: '100vh', // Altura completa de la ventana
        background: `url(${MainPageImage}) no-repeat center center`,
        backgroundSize: 'auto 450px',
        backgroundPosition: 'center 0px', // Centra la imagen
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'flex-start', // Centra verticalmente
      }}
    >
    </Box>
    </>
  );
};
