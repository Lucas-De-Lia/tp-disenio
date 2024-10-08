import { Box, TextField, Typography } from "@mui/material"
import { Header } from "../../components"

export const RegistrarBedelPage = () => {
  return (
    <>
        <Header/>
        <Box
            sx={{
                background:'linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)',
                height:'85vh',
                width:'100%',
                mt:1,
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Box
                sx={{
                    background:'white',
                    width:'60%',
                    height:'90%',
                    borderRadius:2
                }}
            >
                <Box>
                    <Typography variant="h4" component="h4" textAlign="center" mt={6} mb={3}>
                        Registrar Bedel
                    </Typography>
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'space-around',
                            alignItems:'center'                
                        }}
                    >
                        <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:'1px',
                                width:'30%'
                            }}
                        >
                            <Typography color="#5E6366" ml={1}>
                                Nombre
                            </Typography>
                            <TextField
                                label="Nombre"
                            />
                        </Box>
                        <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:'1px',
                                width:'30%'
                            }}
                        >
                            <Typography color="#5E6366" ml={1}>
                                Apellido
                            </Typography>
                            <TextField
                                label="Apellido"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
