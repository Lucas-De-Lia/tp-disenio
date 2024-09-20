import React from 'react';
import { Box, Container, CardMedia } from '@mui/material';
import MainPageImage from '../../assets/img/MainPageImage.png';


export const MainPage = () => {
  return (
    <Box
      sx={{
        height: '100vh', // Altura completa de la ventana
        background: 'linear-gradient(270deg, rgba(50, 125, 147, 0.88) 24%, #69AA92 83.5%)',
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'flex-start', // Centra verticalmente
      }}
    >
        <CardMedia
          component="img"
          image={MainPageImage}
          alt="Imagen de la página principal"
          sx={{
            width: 'auto',
            height: '80vh',
          }}
        />
    </Box>
  );
};
