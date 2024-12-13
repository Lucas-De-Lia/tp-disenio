import { Box, Button, IconButton, InputAdornment, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { ErrorOutline, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CancelModal } from "../modals/CancelModal";
import { passwordAnalizer } from "../helpers";
import axios from "axios";
import { ModificarSuccess } from "../modals/ModificarSuccess";


export const ModificarBedelPage = () => {

  const { id } = useParams();
  const [ searchParams ] = useSearchParams(); 
  const nombreP = searchParams.get("nombre");
  const apellidoP = searchParams.get("apellido");
  const turnoP = searchParams.get("turno");
  const username = searchParams.get("username");
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false)
  const [openCancelarModal, setOpenModal] = useState(false);
  const [openModificadoModal, setOpenModificadoModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
  const [errorList, setErrorList] = useState(null);
  const [error, setError] = useState(false);
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
  
  const handleExitModificado = () => {
    setOpenModificadoModal(!openModificadoModal);
    navigate("/buscar-bedel");
  }

  const handleExit = () => {
    navigate("/buscar-bedel");
  }

  const handleSubmit = async(e,passwordError,repeatedPasswordError,id,username,nombre,apellido,turno,password,repeatedPassword) => {
    e.preventDefault();
    setDisabled(true);
    if(!!passwordError || !!repeatedPasswordError){
      setDisabled(false);
      return
    }else{
      if(password === "" && repeatedPassword === ""){password = null; repeatedPassword = null;}
      const data = {
        idUsuario: id,
        username,
        nombre,
        apellido,
        password,
        repeatedPassword,
        turno,
        registradoPor: JSON.parse(localStorage.getItem("user")).user,
      };
      const headers = {
        "Content-Type": "application/json",
        // Authorization: "Bearer your-token-here", // TODO Para cuando este el token del login
      };
      console.table(data);
      try{
        const response = await axios.put(
          "http://localhost:8080/api/bedeles",
          data,
          { headers }
        )
        setOpenModificadoModal(true);
      }catch(err){  
        setError(true);
        console.log(err.response.data);
        setErrorList(err.response.data);
      }finally{
        setDisabled(false);
      }
    }
  }

  useEffect(() => {
    setPasswordError(passwordAnalizer(password));
    if(password !== repeatedPassword){
      setRepeatedPasswordError("Las contraseñas no coinciden");
    }else{
      setRepeatedPasswordError("");
    }
  
  }, [password,repeatedPassword]);
  
  

  return (
    <>
      <Header/>
      <Box
        sx={{
          background:"linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
          width: "100%",
          minheight: "100vh",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        <Box
          onSubmit = {(e) => handleSubmit(e,passwordError,repeatedPasswordError,id,username,nombre,apellido,turno,password,repeatedPassword)}
          component = "form"
          sx={{
            background:"white",
            width:"60%",
            minHeight:"85%",
            borderRadius:2,
            display:"flex",
            alignItems:"center",
            justifyContent:"flex-start",
            flexDirection:"column",
            mt:5,
            mb:3
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
                {
                  (!passwordError && password.length === 0)
                  ?
                  (
                  <Box
                    height={"50px"}
                  >
                    <Typography color="#5E6366"  variant="caption">
                      La contraseña debe contener al menos 8 caracteres, y al
                      menos incluir una mayúscula, un número y un signo especial
                      (@#$%&*).
                    </Typography>
                    </Box>
                  )
                  :
                  (
                  <Box
                    height={"50px"}
                  >
                    <Typography color="error" variant="caption">
                      {passwordError}
                    </Typography>
                    </Box>
                  )
                }
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
                {
                  (!repeatedPasswordError && repeatedPassword.length === 0)
                  ?
                  (
                  <Box
                    height={"50px"}
                  >
                    <Typography color="#5E6366" variant="caption">
                      La contraseña debe contener al menos 8 caracteres, y al
                      menos incluir una mayúscula, un número y un signo especial
                      (@#$%&*).
                    </Typography>
                  </Box>
                  )
                  :
                  (
                  <Box
                  height={"50px"}
                  >
                    <Typography color="error" variant="caption">
                      {repeatedPasswordError}
                    </Typography>
                  </Box>
                  )
                }
            </Box>
          </Box>
          {errorList !== null && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row nowrap",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  width:"80%"
                }}
              >
                <ErrorOutline sx={{ color: "#2B2F32", fontSize: 40 }} />
                <List
                  sx={{
                    listStyleType: "none",
                    padding: 1,
                    bgcolor: "#EDEDED",
                    borderRadius: 3,
                    width: "45%",
                  }}
                >
                  {Object.entries(errorList).map(([field, message], index) => (
                    <ListItem key={index + field}>
                      <Typography
                        sx={{
                          color: "#2B2F32",
                          fontSize: 14,
                          width: "100%",
                          textAlign: "center"
                        }}
                      >
                        {`${message}`}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={5}
            mt={3}
            mb={2}
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
                disabled={disabled}
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
      <ModificarSuccess openModificadoModal = {openModificadoModal} handleExit = {handleExit}/>
    </>
  )
}
