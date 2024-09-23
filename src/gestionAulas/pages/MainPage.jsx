import React from 'react';
import { Box } from '@mui/material';
import MainPageImage from '../../assets/img/MainPageImage.png';


export const MainPage = () => {
  return (
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
  );
};
