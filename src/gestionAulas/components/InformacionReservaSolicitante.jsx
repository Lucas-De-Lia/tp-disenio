import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import SelectorDiasPorPeriodo from "./SelectorDiasPorPeriodo";
import SelectorDiasEsporadica from "./SelectorDiasEsporadica";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { profesores } from "../helpers/arrayProfesoresEmergencia";

const InformacionReservaSolicitante = ({
  tipoReserva,
  periodoReserva,
  onInputChange,
  listaDias,
  reservasDiasSemana,
  handleCheckboxChange,
  mayus,
  reservasDia,
  handleEditDayEsporadica,
  handleDeleteDayEsporadica,
  handleCalendarPick,
  handleConsultaDisponibilidad,
  tipoAula,
  cantidadAlumnos,
  options,
  actividadAcademica,
  handleSearchChange,
  nombreDocente,
  apellidoDocente,
  correoDocente,
}) => {

    const [docentes, setDocentes] = useState([]);

    const [docenteActual, setDocenteActual] = useState({});

    useEffect(() => {
      const fetchDocentes = async () => {
        try{
            const { data } = await axios.get("http://localhost:8080/api/profesores");
            setDocentes(data);
        }catch(error){
            setDocentes(profesores);
        }
      }
        fetchDocentes();
    }, []);

    const handleSelectDocente = (e) => {
      const selectedNombre = e.target.value;
      const docenteEncontrado = docentes.find((docente) => docente.nombre === selectedNombre);
      setDocenteActual(docenteEncontrado);
      console.log(docenteEncontrado);
      onInputChange(e);
    }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* INFORMACIÓN DE LA RESERVA */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          width: "30%",
          height: "100%"
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          mt={2}
          mb={1}
        >
          Informacion de la reserva
        </Typography>
        <Typography
          color="#5E6366"
          ml={1}
          mt={3}
          component="label"
          htmlFor="tipoReserva"
        >
          Tipo de reserva
        </Typography>
        <Select
          name="tipoReserva"
          id="tipoReserva"
          value={tipoReserva}
          onChange={onInputChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value={"POR_PERIODO"}>Por periodo</MenuItem>
          <MenuItem value={"ESPORADICA"}>Esporadica</MenuItem>
        </Select>

        {tipoReserva === "POR_PERIODO" && (
          <SelectorDiasPorPeriodo
            periodoReserva={periodoReserva}
            onInputChange={onInputChange}
            listaDias={listaDias}
            reservasDiasSemana={reservasDiasSemana}
            handleCheckboxChange={handleCheckboxChange}
            mayus={mayus}
          />
        )}

        {tipoReserva === "ESPORADICA" && (
          <SelectorDiasEsporadica
            reservasDia={reservasDia}
            handleEdit={handleEditDayEsporadica}
            handleDelete={handleDeleteDayEsporadica}
            handleCalendarPick={handleCalendarPick}
          />
        )}

        <Typography
          color="#5E6366"
          ml={1}
          mt={5}
          component="label"
          htmlFor="cantidadAlumnos"
        >
          Cantidad de alumnos
        </Typography>
        <TextField
          name="cantidadAlumnos"
          id="cantidadAlumnos"
          value={cantidadAlumnos}
          onChange={(e) =>
            onInputChange({
              target: {
                // Con parámetro explícito para poder transformar a Number
                name: "cantidadAlumnos",
                value: Number(e.target.value),
              },
            })
          }
          type="number"
          slotProps={{ htmlInput: { min: 1 } }}
        />
        <Typography
          color="#5E6366"
          ml={1}
          mt={5}
          component="label"
          htmlFor="tipoAula"
        >
          Tipo de aula
        </Typography>
        <Select
          name="tipoAula"
          id="tipoAula"
          value={tipoAula}
          onChange={onInputChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value={"MULTIMEDIOS"}>Aula Multimedios</MenuItem>
          <MenuItem value={"INFORMATICA"}>Aula Informatica</MenuItem>
          <MenuItem value={"SIN_RECURSOS_ADICIONALES"}>Aula Regular</MenuItem>
        </Select>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            width: "100%",
            color: "#32936F",
            borderColor: "#32936F",
            marginTop: 4,
            paddingY: 1.5,
            borderRadius: 3,
          }}
          onClick={async () => await handleConsultaDisponibilidad()}
        >
          Consultar disponibilidad
        </Button>
        <br />
      </Box>

      {/* INFORMACIÓN DEL SOLICITANTE */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          width: "30%",
          height: "100%", 
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          mt={2}
          mb={1}
        >
          Informacion del solicitante
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Box width="100%">
            <Typography
              component="label"
              htmlFor="nombreDocente"
              color="#5E6366"
              variant="contained"
              ml={1}
            >
              Nombre docente
            </Typography>
            <Select
              name="nombreDocente"
              id="nombreDocente"
              value={nombreDocente}
              onChange={handleSelectDocente}
              MenuProps={{
                disableScrollLock: true,
              }}
              fullWidth
            >
              {
                docentes.map((docente) => (
                    <MenuItem key={docente.id} value = {docente.nombre}>{docente.nombre}  </MenuItem>
                  ))
              }
            </Select>
          </Box>
          <Box width="100%">
            <Typography
              component="label"
              htmlFor="nombreDocente"
              color="#5E6366"
              variant="contained"
              ml={1}
            >
              Apellido docente
            </Typography>
            <Select
              name="apellidoDocente"
              id="apellidoDocente"
              value={apellidoDocente || ""}
              disabled = {!nombreDocente}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={onInputChange}
              fullWidth
            >
              {
                (docenteActual?.apellido ) && (<MenuItem value={docenteActual.apellido}>{docenteActual.apellido}</MenuItem>)
              }
            </Select>
          </Box>
          <Box width="100%">
            <Typography
              component="label"
              htmlFor="nombreDocente"
              color="#5E6366"
              variant="contained"
              ml={1}
            >
              Actividad academica
            </Typography>
            <Select
              name="actividadAcademica"
              id="actividadAcademica"
              value={actividadAcademica || ""}
              disabled = {!nombreDocente}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={onInputChange}
              fullWidth
            >
              {
                docenteActual?.materias?.map((materia) => (
                    <MenuItem key={materia.nombre} value = {materia.nombre}>{materia.nombre}</MenuItem>
                  ))
              }
            </Select>
          </Box>
          <Box width="100%">
          <Typography
              component="label"
              htmlFor="nombreDocente"
              color="#5E6366"
              variant="contained"
              ml={1}
            >
              Correo docente
            </Typography>
            <Select
              name="correoDocente"
              id="correoDocente"
              value={correoDocente || ""}
              disabled = {!nombreDocente}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={onInputChange}
              fullWidth
            >
              {
                (docenteActual?.email ) && (<MenuItem value={docenteActual.email}>{docenteActual.email}</MenuItem>)
              }
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

InformacionReservaSolicitante.propTypes = {
  tipoReserva: PropTypes.string.isRequired,
  periodoReserva: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  listaDias: PropTypes.array.isRequired,
  reservasDiasSemana: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  mayus: PropTypes.func.isRequired,
  reservasDia: PropTypes.array.isRequired,
  handleEditDayEsporadica: PropTypes.func.isRequired,
  handleDeleteDayEsporadica: PropTypes.func.isRequired,
  handleCalendarPick: PropTypes.func.isRequired,
  handleConsultaDisponibilidad: PropTypes.func.isRequired,
  tipoAula: PropTypes.string.isRequired,
  cantidadAlumnos: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  actividadAcademica: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  nombreDocente: PropTypes.string.isRequired,
  apellidoDocente: PropTypes.string.isRequired,
  correoDocente: PropTypes.string.isRequired,
};

export default InformacionReservaSolicitante;
