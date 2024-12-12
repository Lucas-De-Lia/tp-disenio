import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios"
import { Header } from "../../components";
import { useState, useEffect } from "react";
import { ReservasPorFechaTable } from "../components/ReservasPorFechaTable";
import { CancelModal } from "../modals/CancelModal";
import { ErrorModalGeneral } from "../modals/ErrorModalGeneral";
import { useNavigate } from "react-router-dom";

export const ReservasPorFechaPage = () => {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState(null);
  const [tipoAula, setTipoAula] = useState("TODAS");
  const [numeroAula, setNumeroAula] = useState("TODAS");
  
  const [cancelarModal, setCancelarModal] = useState(false);
  const [numerosAula, setNumerosAula] = useState(["TODAS"]);
  
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFecha = (newValue) => {
    setFecha(newValue);
  };

  const handleTipoAula = (e) => {
    setTipoAula(e.target.value);
  };

  const handleNumeroAula = (e) => {
    setNumeroAula(e.target.value);
  };

  const handleCancelar = () => {
    setCancelarModal(!cancelarModal);
  };

  const handleErrorModal = (state) => {
    setError(state);
  };


  const handleExit = () => {
    navigate("/dashboard");
  };

    const fetchNumerosAula = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/aulas');
            const aulas = response.data;
            const numeros = aulas.map(aula => aula.nroAula);
            setNumerosAula(["TODAS", ...numeros]);
        } catch (error) {
            setError(true);
            setErrorMessage("Error al obtener los números de aula disponibles");
            console.error(error);
        }
    };

  useEffect(() => {
    fetchNumerosAula();
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: "white",
            mt: "50px",
            mb: "50px",
            padding: 5,
            borderRadius: 2,
            width: "60%",
            Height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4" component="h1">
            Reservas por fecha
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            width="80%"
            mt={5}
            gap={1.5}
          >
            <Box display="flex" flexDirection="column" gap="2px" width="40%">
              <Typography
                variant="caption"
                component="label"
                htmlFor="fecha"
                color="#5E6366"
                ml={1}
              >
                Día
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="fecha"
                  value={fecha}
                  onChange={handleFecha}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  disableScrollLock
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" flexDirection="column" gap="2px" width="40%">
              <Typography
                variant="caption"
                component="label"
                htmlFor="tipoAula"
                color="#5E6366"
                ml={1}
              >
                Tipo de Aula
              </Typography>
              <Select
                id="tipoAula"
                value={tipoAula}
                onChange={handleTipoAula}
                fullWidth
              >
                <MenuItem value="TODAS">TODAS</MenuItem>
                <MenuItem value="MULTIMEDIOS">MULTIMEDIOS</MenuItem>
                <MenuItem value="INFORMATICA">INFORMATICA</MenuItem>
                <MenuItem value="SIN_RECURSOS_ADICIONALES">
                  SIN RECURSOS ADICIONALES
                </MenuItem>
              </Select>
            </Box>
            <Box display="flex" flexDirection="column" gap="2px" width="40%">
              <Typography
                variant="caption"
                component="label"
                htmlFor="numeroAula"
                color="#5E6366"
                ml={1}
              >
                Número de Aula
              </Typography>
              <Select
                id="numeroAula"
                value={numeroAula}
                onChange={handleNumeroAula}
                fullWidth
              >
                {numerosAula.map((aula) => (
                  <MenuItem key={aula} value={aula}>{aula}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <ReservasPorFechaTable
            fecha={fecha}
            tipoAula={tipoAula}
            numeroAula={numeroAula}
            setError={setError}
            setErrorMessage={setErrorMessage}
          />
          <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            mt={1}
          >
            <Button
              variant="outlined"
              size="medium"
              sx={{
                width: "200px",
                color: "#32936F",
                borderColor: "#32936F",
              }}
              onClick={handleCancelar}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
      <CancelModal
        modal={cancelarModal}
        handleModal={handleCancelar}
        handleExit={handleExit}
      />
      <ErrorModalGeneral error={error} handleErrorModal={handleErrorModal} errorMessage={errorMessage}/>
    </>
  );
};
