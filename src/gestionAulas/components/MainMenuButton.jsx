import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import MainPageImage from '../../assets/img/MainPageImage.png';

export const MainMenuButton = ({link, image, text, alt}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '210px', // Altura de la imagen
        width: '210px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover', // Ajusta la imagen a su contenedor
        }}
      />
      {/* Caja que contiene el texto superpuesto */}
      <Box
        sx={{
          color: 'white', // Color del texto
        }}
      >
        <Typography variant="span">
            {text}
        </Typography>
      </Box>
    </Box>
  );
};