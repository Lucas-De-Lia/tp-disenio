import { useContext } from 'react';
import { Box, CardMedia} from '@mui/material';
import MainMenuImage from './assets/MainMenuImage.png';
import { MainMenuButton } from '../components';
import MainMenuButtonImage1 from './assets/MainMenuButtonImage1.png';
import MainMenuButtonImage2 from './assets/MainMenuButtonImage2.png';
import MainMenuButtonImage3 from './assets/MainMenuButtonImage3.png';
import { Header } from "../../components";
import { UserTypes } from '../../constants';
import { AuthContext } from '../../context';

export const MainMenuPage = () => {

    //modificar para que solo se muestren los botones de registrar bedel y buscar bedel si el usuario es admin y funcione con el contexto
    const {userType} = useContext(AuthContext);
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
                {userType ===  UserTypes.ADMIN && (
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
