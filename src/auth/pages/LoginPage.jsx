import { AccountCircleOutlined } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [logError, setLogError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const resp = await login(usuario, contrasenia);
    if (resp) {
      setLogError(false);
      navigate('/dashboard');
    } else {
      setLogError(true);
    }
  };

  const { usuario, contrasenia, onInputChange } = useForm({
    usuario: "",
    contrasenia: ""
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >
      <Grid
        container
        className='box-shadow'
        alignItems='center'
        justifyContent='center'
        direction='column'
        sx={{ 
          width: { sm: 450 },
          backgroundColor: 'white', 
          padding: 3, 
          borderRadius: 2 
        }}
      >
        <AccountCircleOutlined sx={{ color: "#32936F", fontSize: 60 }} />
        <Typography variant='h6' sx={{ mb: 1, color: "#32936F", textAlign: "center" }}>
          Bienvenido a<br />RoomWise
        </Typography>

        <form onSubmit={handleLogin}>
          <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Grid item>
              <Grid container sx={{ mt: 2 }}>
                <TextField 
                  name="usuario"
                  label="Nombre usuario" 
                  type="text" 
                  value={usuario}
                  placeholder='MiNombreUsuario' 
                  fullWidth
                  color='success'
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                    }
                  }}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <TextField 
                  name="contrasenia"
                  label="Contraseña" 
                  type="password"
                  value={contrasenia} 
                  placeholder='Contraseña' 
                  fullWidth
                  color='success'
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                    }
                  }}
                  onChange={onInputChange}
                />
              </Grid>
              <Box>
                {logError && 
                (
                  <Typography variant='body2' sx={{ color: 'red', mt: 1 }}>
                    Usuario o contraseña incorrectos
                  </Typography>
                )
                }
              </Box>
              <Grid item sx={{ mb: 2, mt: 2 }}>
                <Grid item>
                  <Button 
                    variant='contained' 
                    fullWidth 
                    type="submit"
                    sx={{ marginTop: 2, borderRadius: 3, background: '#32936F', padding: 2 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}


