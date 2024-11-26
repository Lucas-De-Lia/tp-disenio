import { Box, CardMedia, Typography } from '@mui/material';
import { Link } from "react-router-dom";

export const MainMenuButton = ({link, image, text, alt}) => {

  return (
    <Link to={link} underline="none">
      <Box
        sx={{
          position: 'relative',
          '&:hover': {
            opacity: 0.875,
            transition: 'opacity 100ms',
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{
            height: '150px',
            width: 'auto',
          }}
        />
        <Box
          sx={{
            color: 'white', // Color del texto
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '17px',
            marginTop: '10px',
            fontWeight: 'bold',
          }}
        >
          <Typography variant="span">
            {text}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};