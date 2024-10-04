import React from 'react';
import { Box, CardMedia, Link } from '@mui/material';
import MainMenuImage from './assets/MainMenuImage.png';
import { MainMenuButton } from '../components/MainMenuButton';
import MainMenuButtonImage1 from './assets/MainMenuButtonImage1.png';
import MainMenuButtonImage2 from './assets/MainMenuButtonImage2.png';
import MainMenuButtonImage3 from './assets/MainMenuButtonImage3.png';
import { Header } from "../../components/Header/Header";
import { useAuth } from '../../auth/AuthProvider';
import { UserTypes } from '../../constants/userTypes';

export const MainMenuPage = () => {
    const auth = useAuth();
    
    return (
        <>
        <Header/>
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
            {/* Frase */}
            <CardMedia
                component="img"
                image={MainMenuImage}
                alt="Un lugar para cada clase, una clase en cada lugar"
                sx={{
                    height: '200px',
                    width: 'auto',
                }}
                />
                
            {/* Botones */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '50px',
            }}>
                <MainMenuButton link="/reservas-por-fecha" image={MainMenuButtonImage1} text="Reservas por Fecha" alt="Reservas por Fecha"/>
                <MainMenuButton link="/reservas-por-curso" image={MainMenuButtonImage1} text="Reservas por Curso" alt="Reservas por Curso"/>
                {auth.user && auth.user.tipoUsuario ===  UserTypes.ADMIN && (
                    <>
                        <MainMenuButton link="/buscar-bedel" image={MainMenuButtonImage2} text="Buscar Bedel" alt="Buscar Bedel"/>
                        <MainMenuButton link="/registrar-bedel" image={MainMenuButtonImage3} text="Registrar Bedel" alt="Registrar Bedel"/>
                    </>
                )}
                <MainMenuButton link="/registrar-reserva" image={MainMenuButtonImage3} text="Registrar Reserva" alt="Registrar Reserva"/>
            </Box>
        </Box>
        </>
    );
};
