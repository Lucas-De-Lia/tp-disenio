import { Box, Button, IconButton, InputAdornment, MenuItem, Select, TextField, Typography, List, ListItem } from "@mui/material";
import { Header } from "../../components";
import { ErrorOutline, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { SuccessModal } from "../modals/SuccessModal";
import { ErrorModal } from "../modals/ErrorModal";
import { CancelModal } from "../modals/CancelModal";
import { handleSubmit , passwordAnalizer } from "../helpers";

export const RegistrarBedelPage = () => {
  const navigate = useNavigate();

  const {
    nombre,
    apellido,
    turno,
    password,
    repeatedPassword,
    idUsuario,
    onInputChange,
    onResetForm
  } = useForm({
    nombre: "",
    apellido: "",
    turno: "",
    password: "",
    repeatedPassword: "",
    idUsuario: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [repPasswordError, setRepPasswordError] = useState("");
  const [disabled, setDisabled] = useState(false)

  const handleClose = () => {
    setSuccess(false);
    onResetForm();
  };

  const handleErrorModal = (state) => {
    setError(state);
  };

  const handleSuccessExit = () => {
    setSuccess(false);
    navigate("/dashboard");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleModal = (state) => {
    setModal(state);
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setPasswordError(passwordAnalizer(password));
    if(password !== repeatedPassword && !!repeatedPassword){
      setRepPasswordError("Las contraseñas no coinciden");
    }else{
      setRepPasswordError("");
    }
  }, [password, repeatedPassword])
  

  return (
    <>
      <form onSubmit={
        (e) => {
          handleSubmit(e, {idUsuario,nombre,apellido,password,repeatedPassword,turno},{setSuccess,setError,setErrorList,setDisabled},{passwordError,repPasswordError});
        }
        }>
        <Header />
        <Box
          sx={{
            background:
              "linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
            minHeight: "100vh",
            width: "100%",
            paddingY: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Contenedor formulario */}
          <Box
            sx={{
              background: "white",
              width: "60%",
              minHeight: "90%",
              paddingY: 7,
              borderRadius: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h4"
                textAlign="center"
                mt={6}
                mb={3}
              >
                Registrar Bedel
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    width: "30%",
                  }}
                >
                  <Typography color="#5E6366" ml={1} component="label" htmlFor="nombre">
                    Nombre
                  </Typography>
                  <TextField
                    name="nombre"
                    id="nombre"
                    value={nombre}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5} component="label" htmlFor="turno">
                    Turno
                  </Typography>
                  <Select name="turno" id="turno" value={turno} onChange={onInputChange}>
                    <MenuItem value={"MANIANA"}>Turno Mañana</MenuItem>
                    <MenuItem value={"TARDE"}>Turno Tarde</MenuItem>
                    <MenuItem value={"NOCHE"}>Turno Noche</MenuItem>
                  </Select>
                  <Typography color="#5E6366" ml={1} mt={5} component="label" htmlFor="password">
                    Contraseña
                  </Typography>
                  <TextField
                    name="password"
                    id="password"
                    value={password}
                    onChange={onInputChange}
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
                            <IconButton onClick={handleShowPassword}>
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
                      (<Typography color="#5E6366" ml={1} variant="caption">
                        La contraseña debe contener al menos 8 caracteres, y al
                        menos incluir una mayúscula, un número y un signo especial
                        (@#$%&*).
                      </Typography>)
                      : 
                      (<Typography color="error" ml={1} variant="caption">
                        {passwordError}
                      </Typography>)
                  }
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    width: "30%",
                  }}
                >
                  <Typography color="#5E6366" ml={1} component="label" htmlFor="apellido">
                    Apellido
                  </Typography>
                  <TextField
                    name="apellido"
                    id="apellido"
                    value={apellido}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5} component="label" htmlFor="userName">
                    Nombre de usuario
                  </Typography>
                  <TextField
                    name="idUsuario"
                    id="userName"
                    type="text"
                    value={idUsuario}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5} component="label" htmlFor="repPass">
                    Confirmar contraseña
                  </Typography>
                  <TextField
                    name="repeatedPassword"
                    id="repPass"
                    value={repeatedPassword}
                    onChange={onInputChange}
                    type={showPasswordConfirmation ? "text" : "password"}
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
                              onClick={handleShowPasswordConfirmation}
                            >
                              {!showPasswordConfirmation ? (
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
                    (!repPasswordError && repeatedPassword.length === 0)
                    ?
                      (<Typography color="#5E6366" ml={1} variant="caption">
                        La contraseña debe contener al menos 8 caracteres, y al
                        menos incluir una mayúscula, un número y un signo especial
                        (@#$%&*).
                      </Typography>)
                      : 
                      (<Typography color="error" ml={1} variant="caption">
                        {repPasswordError}
                      </Typography>)
                  }
                </Box>
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
                  marginTop: 5,
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
                        }}
                      >
                        {`${message}`}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {/*  
                  BOTONES DE CANCELAR Y REGISTRAR
            */}
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
                sx={{
                  width: "200px",
                  color: "#32936F",
                  borderColor: "#32936F",
                }}
                onClick={() => handleModal(true)}
              >
                Cancelar
              </Button>
              <CancelModal modal={modal} handleModal={handleModal} handleExit={handleExit}/>
              <Button
                type="submit"
                variant="contained"
                disabled = {disabled}
                size="medium"
                sx={{
                  width: "200px",
                  backgroundColor: "#32936F",
                }}
              >
                Registrar bedel
              </Button>
              <SuccessModal success={success} handleClose={handleClose} handleSuccessExit={handleSuccessExit}/>
              <ErrorModal error={error} handleErrorModal={handleErrorModal}/>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
