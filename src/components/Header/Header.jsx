import { AppBar, Box, Button, Toolbar } from "@mui/material"
import { Link } from "react-router-dom"
import { UtnIcon } from "./UtnIcon"
//opacity:'0.9' me gustaria agregar esto
export const Header = () => {
  return (
    <>
        <AppBar sx={{position: 'sticky',height:'15vh'}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'linear-gradient(90deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)'}}>
                <Link to="/"><UtnIcon style = {{Height:250,Width: 250}}/></Link>
                <Box sx={{display:'flex',gap:20}}>
                    <Link to="/faq"><Button sx={{color:'white'}}>Preguntas Frecuentes</Button></Link>
                    <Link to="/about"><Button sx={{color:'white'}}>Sobre nosotros</Button></Link>
                    <Link to="/auth/login">
                        <Button sx={{background:'#FF6496',color:'white',paddingRight:5,paddingLeft:5,marginRight:5, borderRadius:2}}>
                            Iniciar sesión
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}
