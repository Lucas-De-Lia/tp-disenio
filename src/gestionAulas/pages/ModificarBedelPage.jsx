import { Box, Button, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CancelModal } from "../modals/CancelModal";


export const ModificarBedelPage = () => {

  const { id } = useParams();
  const [ searchParams ] = useSearchParams(); 
  const nombreP = searchParams.get("nombre");
  const apellidoP = searchParams.get("apellido");
  const turnoP = searchParams.get("turno");
  const username = searchParams.get("username");
  const navigate = useNavigate();

  const [openCancelarModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const {nombre, apellido, turno, password, repeatedPassword, onInputChange, onResetForm} = useForm({
    nombre: nombreP,
    apellido: apellidoP,
    turno: turnoP,
    password: "",
    repeatedPassword: ""
  });

  const handlePassword = () => {
    setShowPassword(!showPassword);
  }
  const handleRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  }

  const handleModal = () => {
    setOpenModal(!openCancelarModal);
  }
  
  const handleExit = () => {
    navigate("/buscar-bedel");
  }
  

  return (
    <>
      <Header/>
      <Box
        sx={{
          background:"linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
          width: "100%",
          height: "100vh",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        <Box
          sx={{
            background:"white",
            width:"60%",
            height:"80%",
            borderRadius:2,
            display:"flex",
            alignItems:"center",
            justifyContent:"flex-start",
            flexDirection:"column",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            mt={10}
            sx={{
              fontWeight:"bold"
            }}
          >
            Modificar bedel
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            width="80%"
            component="form"
          >
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              flexDirection="column"
              height={"400px"}
              width={"40%"}
            >
              <Typography
                component="label"
                variant="contained"
                color="#5E6366"
                htmlFor="nombre"
                ml={1} 
              >
                Nombre
              </Typography>
              <TextField
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={onInputChange}
                fullWidth
              />
              <Typography
                component="label"
                variant="contained"
                color="#5E6366"
                htmlFor="turno"
                ml={1} 
                mt={5}
              >
                Turno
              </Typography>
              <Select 
                name="turno" 
                id="turno"
                value={turno}
                onChange={onInputChange}
                fullWidth
                MenuProps={{
                  disableScrollLock: true, // Evita bloquear el desplazamiento del body
                }}
                  >
                    <MenuItem value={"MANIANA"}>Turno Mañana</MenuItem>
                    <MenuItem value={"TARDE"}>Turno Tarde</MenuItem>
                    <MenuItem value={"NOCHE"}>Turno Noche</MenuItem>
              </Select>
              <Typography 
                color="#5E6366" 
                ml={1} 
                mt={5} 
                component="label" 
                htmlFor="password"
              >
                Contraseña
              </Typography>
              <TextField
                    name="password"
                    id="password"
                    value={password}
                    onChange={onInputChange}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handlePassword}
                            >
                              {!showPassword ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                />
            </Box>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              flexDirection="column"
              height={"400px"}
              width={"40%"}
            >
            <Typography
                component="label"
                variant="contained"
                color="#5E6366"
                htmlFor="apellido"
                ml={1} 
              >
                Apellido
              </Typography>
              <TextField
                name="apellido"
                id="apellido"
                onChange={onInputChange}
                value={apellido}
                fullWidth
              />
              <Typography
                component="label"
                variant="contained"
                color="#5E6366"
                htmlFor="username"
                ml={1}
                mt={5} 
              >
                Nombre de usuario
              </Typography>
              <TextField
                name="username"
                id="username"
                value={username}
                disabled
                fullWidth
                sx={{
                  backgroundColor:"#F5F5F5",
                  color:"#5E6366"
                }}
              />
              <Typography 
                color="#5E6366" 
                ml={1} 
                mt={5} 
                component="label" 
                htmlFor="repeatedPassword"
              >
                Confirmar contraseña
              </Typography>
              <TextField
                    name="repeatedPassword"
                    id="repeatedPassword"
                    value={repeatedPassword}
                    onChange={onInputChange}
                    fullWidth
                    type={showRepeatedPassword ? "text" : "password"}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleRepeatedPassword}
                            >
                              {!showRepeatedPassword ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={5}
          >
            <Button
                variant="outlined"
                size="medium"
                sx={{
                  width: "200px",
                  color: "#32936F",
                  borderColor: "#32936F",
                }}
                onClick={handleModal}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  width: "200px",
                  backgroundColor: "#32936F",
                }}
              >
                Modificar bedel
              </Button>
          </Box>
        </Box>
      </Box>
      <CancelModal modal={openCancelarModal} handleModal={handleModal} handleExit={handleExit}/>
    </>
  )
}
