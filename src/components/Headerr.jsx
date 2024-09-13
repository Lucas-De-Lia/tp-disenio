import { AppBar, Box, Button, Toolbar } from "@mui/material"
import { UtnIcon } from "./UtnIcon"


export const Headerr = () => {
  return (
    <>
        <AppBar>
            <Toolbar sx={{maxHeight:100,display:'flex',justifyContent:'space-between',alignItems:'center' ,background:'linear-gradient(90deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)'}}>
                <UtnIcon style = {{Height:250,Width: 250}}/>
                <Box sx={{display:'flex',gap:20}}>
                    <Button sx={{color:'#FFF'}}>Preguntas Frecuentes</Button>
                    <Button sx={{color:'#FFF'}}>Sobre nosotros</Button>
                    <Button sx={{background:'#FF6496',color:'white',paddingRight:5,paddingLeft:5,marginRight:5, borderRadius:2}}>
                        Iniciar sesión
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}
