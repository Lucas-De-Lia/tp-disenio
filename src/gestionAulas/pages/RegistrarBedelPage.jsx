import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Header } from "../../components";
import {
  CheckCircleOutlineOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import axios from "axios";

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

  const handleClose = () => {
    setSuccess(false);
    onResetForm();
}
const handleSuccessExit = () => {
    setSuccess(false);
    navigate('/dashboard');
}

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO modificar el form o el back para no tener que hacer esto
    const data = {
      idUsuario,
      nombre,
      //habilitado: true, no es necesario
      apellido,
      password,
      repeatedPassword,
      turno,
      registradoPor: JSON.parse(localStorage.getItem("user")).user
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        // Authorization: "Bearer your-token-here", // TODO Para cuando este el token del login
      };

      const response = await axios.post(
        "http://localhost:8080/api/create/bedel",
        data,
        { headers }
      );
      console.log("Response:", response.data);
      setSuccess(true);
      setError(null);
      // TODO Manejar caso success, creo q era mostrar un modal de exito que dsp te lleve al dashboard
      //navigate("/dashboard"); lo pase al modal de exito
    } catch (error) {
      console.error("Error:", error);
      // TODO Manejar caso error, que se settee el mensaje del back en el form
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Header />
        <Box
          sx={{
            background:
              "linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
            height: "100vh",
            width: "100%",
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "white",
              width: "60%",
              height: "90%",
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
                  <Typography color="#5E6366" ml={1}>
                    Nombre
                  </Typography>
                  <TextField
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5}>
                    Turno
                  </Typography>
                  <Select name="turno" value={turno} onChange={onInputChange}>
                    <MenuItem value={"MANIANA"}>Turno Mañana</MenuItem>
                    <MenuItem value={"TARDE"}>Turno Tarde</MenuItem>
                    <MenuItem value={"NOCHE"}>Turno Noche</MenuItem>
                  </Select>
                  <Typography color="#5E6366" ml={1} mt={5}>
                    Contraseña
                  </Typography>
                  <TextField
                    name="password"
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
                  <Typography color="#5E6366" ml={1} variant="caption">
                    La contraseña debe contener al menos 8 caracteres, incluir
                    una mayúscula e incluir un número.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    width: "30%",
                  }}
                >
                  <Typography color="#5E6366" ml={1}>
                    Apellido
                  </Typography>
                  <TextField
                    name="apellido"
                    value={apellido}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5}>
                    Identificador de usuario
                  </Typography>
                  <TextField
                    name="idUsuario"
                    type="number"
                    value={idUsuario}
                    onChange={onInputChange}
                  />
                  <Typography color="#5E6366" ml={1} mt={5}>
                    Confirmar contraseña
                  </Typography>
                  <TextField
                    name="repeatedPassword"
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
                  <Typography color="#5E6366" ml={1} variant="caption">
                    La contraseña debe contener al menos 8 caracteres, incluir
                    una mayúscula e incluir un número.
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
                sx={{
                  width: "200px",
                  color: "#32936F",
                  borderColor: "#32936F",
                }}
                onClick={() => handleModal(true)}
              >
                Cancelar
              </Button>
              <Modal open={modal} onClose={() => handleModal(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    width: "30%",
                    height: "30%",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" component="h5" mt={5}>
                    ¿Está seguro que desea cancelar?
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={5}
                  >
                    <Box display="flex" alignItems="center" gap={5}>
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          width: "100px",
                          color: "#32936F",
                          borderColor: "#32936F",
                        }}
                        onClick={() => handleModal(false)}
                      >
                        No
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          width: "100px",
                          backgroundColor: "#32936F",
                        }}
                        onClick={handleExit}
                      >
                        Si
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  width: "200px",
                  backgroundColor: "#32936F",
                }}
              >
                Registrar bedel
              </Button>
              <Modal open = {success} onClose={handleClose }>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    width: "35%",
                    height: "35%",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" component="h5" mt={5}>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      gap={2}
                    >
                      El bedel se ha registrado con exito! 
                      <CheckCircleOutlineOutlined
                          sx={{ color: "#32936F", fontSize: 60 }}
                      />
                    </Box>
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={5}
                  >
                    <Box display="flex" alignItems="center" gap={5}>
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          width: "200px",
                          color: "#32936F",
                          borderColor: "#32936F",
                          height: "50px"
                        }}
                        onClick={handleClose}
                      >
                        Registrar otro bedel
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          width: "200px",
                          backgroundColor: "#32936F",
                          height: "50px"
                        }}
                        onClick={handleSuccessExit}
                      >
                        Salir
                      </Button>
                    </Box>
                  </Box>
                </Box>
                </Modal>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
