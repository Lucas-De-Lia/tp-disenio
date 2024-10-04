import { AccountCircleOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { useAuth } from "../AuthProvider";
import { UserTypes } from "../../constants/userTypes";

export const LoginPage = () => {
  
  const auth = useAuth();
  const handleLogin = (role) => {
    if(role == "El Admin"){
      auth.loginAction(UserTypes.ADMIN);
    }else if(role == "Bedelcito"){
      auth.loginAction(UserTypes.BEDEL);
    }
    console.log(`Logging in as ${role}`);
  };

  return (
    <Grid2
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >

      <Grid2 container
       className='box-shadow'
       alignItems='center'
       justifyContent='center'
       direction='column'
       sx={{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}>
          <AccountCircleOutlined sx={{color:"#32936F",fontSize:60}}/>
          <Typography variant='h6' sx={{ mb: 1 , color:"#32936F", textAlign:"center"}}>Bienvenido a<br/>RoomWise</Typography>

            
        <form>
        <Grid2 container direction='column' alignItems='center' justifyContent='center'>
          <Grid2 item>
            <Grid2 item sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                color = 'success'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                  }}}
                />
            </Grid2>

            <Grid2 item sx={{ mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                color = 'success'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                     
                  }}}
                />
            </Grid2>
            <Grid2 item sx={{ mb: 2, mt: 2 }}>
              <Grid2 item >
                <Button 
                  variant='contained' 
                  fullWidth 
                  sx={{borderRadius:3, background:'#32936F', padding:2}}
                  onClick={() => handleLogin('Bedelcito')}
                >
                  Login as Bedelcito🥺
                </Button>
                <Button 
                  variant='contained' 
                  fullWidth 
                  sx={{marginTop: 2, borderRadius:3, background:'#32936F', padding:2}}
                  onClick={() => handleLogin('El Admin')}
                >
                  Login as El Admin😎
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        </form>
      </Grid2>

    </Grid2>
  )
}

