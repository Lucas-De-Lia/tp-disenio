import { Box, Button, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RegistrarBedelPage = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [turno, setTurno] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  return (
    <>
        <Header/>
        <Box
            sx={{
                background:'linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)',
                height:'100vh',
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
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <Typography color="#5E6366" ml={1} mt={5}>
                                Turno
                            </Typography>
                            <Select
                                value={turno}
                                onChange={(e) => setTurno(e.target.value)}
                            >
                                <MenuItem value = {'Turno Mañana'}>Turno Mañana</MenuItem>
                                <MenuItem value = {'Turno Trade'}>Turno Tarde</MenuItem>
                                <MenuItem value = {'Turno Noche'}>Turno Noche</MenuItem>
                            </Select>
                            <Typography color="#5E6366" ml={1} mt={5}>
                                Contraseña
                            </Typography>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                slotProps={{
                                    input:{
                                        startAdornment:( <InputAdornment position="start">
                                            <LockOutlined/>
                                        </InputAdornment>),
                                        endAdornment:
                                            (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleShowPassword}
                                                >
                                                {!showPassword ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
                                                </IconButton>
                                            </InputAdornment>
                                            )
                                    }
                                }
                                }
                            />
                            <Typography color="#5E6366" ml={1} variant="caption">
                                La contraseña debe contener al menos 8 caracteres, incluir una mayúscula e incluir un número.
                            </Typography>
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
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                            <Typography color="#5E6366" ml={1} mt={5}>
                                Identificador de usuario
                            </Typography>
                            <TextField
                                type="number"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                            <Typography color="#5E6366" ml={1} mt={5}>
                                Confirmar contraseña
                            </Typography>
                            <TextField
                                type={showPasswordConfirmation ? "text" : "password"}
                                slotProps={{
                                    input:{
                                        startAdornment:( <InputAdornment position="start">
                                            <LockOutlined/>
                                        </InputAdornment>),
                                        endAdornment:
                                        (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleShowPasswordConfirmation}
                                            >
                                                {!showPasswordConfirmation ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }
                                }
                                }
                            />
                            <Typography color="#5E6366" ml={1} variant="caption">
                                La contraseña debe contener al menos 8 caracteres, incluir una mayúscula e incluir un número.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                    gap={5}
                >
                    <Button 
                        variant="outlined"
                        size="medium"
                        sx = {{
                            width: '200px',
                            color:"#32936F",
                            borderColor:"#32936F"
                        }}
                    >
                    Cancelar
                    </Button>
                    <Button 
                        variant="contained"
                        size="medium"
                        sx = {{
                            width: '200px',
                            backgroundColor:"#32936F"
                        }}
                    >
                        Registrar bedel
                    </Button>
                </Box>
            </Box>
        </Box>
    </>
  )
}
