import React from 'react';
import { Box, CardMedia} from '@mui/material';
import MainMenuImage from './assets/MainMenuImage.png';
import { MainMenuButton } from '../components/MainMenuButton';
import MainMenuButtonImage1 from './assets/MainMenuButtonImage1.png';
import MainMenuButtonImage2 from './assets/MainMenuButtonImage2.png';
import MainMenuButtonImage3 from './assets/MainMenuButtonImage3.png';

export const MainMenuPage = () => {
return (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '50px',
        }}
    >
        <CardMedia
            component="img"
            image={MainMenuImage}
            alt="Un lugar para cada clase, una clase en cada lugar"
            sx={{
                height: '200px',
                width: 'auto',
                objectFit: 'cover', // Ajusta la imagen a su contenedor
            }}
        />
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }}>
            <MainMenuButton link="#" image={MainMenuButtonImage1} text="Reservas por Fecha" alt="Reservas por Fecha"/>
            <MainMenuButton link="#" image={MainMenuButtonImage1} text="Reservas por Curso" alt="Reservas por Curso"/>
            <MainMenuButton link="#" image={MainMenuButtonImage2} text="Buscar Bedel" alt="Buscar Bedel"/>
            <MainMenuButton link="#" image={MainMenuButtonImage3} text="Registrar Bedel" alt="Registrar Bedel"/>
            <MainMenuButton link="#" image={MainMenuButtonImage3} text="Registrar Reserva" alt="Registrar Reserva"/>
        </Box>
    </Box>
);
};
