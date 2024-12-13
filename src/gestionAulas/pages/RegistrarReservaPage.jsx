import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Header } from "../../components/Header";
import { Delete, Edit, ErrorOutline } from "@mui/icons-material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { SuccessModal } from "../modals/SuccessModalReserva";
import { ErrorModal } from "../modals/ErrorModal";
import { CancelModal } from "../modals/CancelModal";
import DuracionModal from "../modals/DuracionModal";
import axios from "axios";
import { listaDias } from "../../constants/dias";
import AulaSelectionModal from "./AulasDisponibles";

export const RegistrarReservaPage = () => {
  const navigate = useNavigate();

  const {
    nombreDocente,
    apellidoDocente,
    tipoReserva,
    cantidadAlumnos,
    tipoAula,
    correoDocente,
    periodoReserva,
    actividadAcademica,
    onInputChange,
    onResetForm,
  } = useForm({
    nombreDocente: "",
    apellidoDocente: "",
    tipoReserva: "",
    tipoAula: "",
    cantidadAlumnos: 0,
    correoDocente: "",
    periodoReserva: "",
    actividadAcademica: "",
  });

  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [duracionModalOpen, setDuracionModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [esPeriodo, setEsPeriodo] = useState(false);
  const [diasReserva, setDiasReserva] = useState([]);
  const [options, setOptions] = useState([]);
  const [reservasDiasSemana, setReservasDiasSemana] = useState([]);
  const [reservasDia, setReservasDia] = useState([]);
  const [aulaModalOpen, setAulaModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState();

  const handleClose = () => {
    setSuccess(false);
    setErrorList(null);
    onResetForm();
  };

  const handleErrorModal = (state) => {
    setError(state);
  };

  const handleSuccessExit = () => {
    setSuccess(false);
    navigate("/dashboard");
  };

  useEffect(
    () => {
      if (tipoReserva === "POR_PERIODO") {
        setReservasDia([]);
      } else if (tipoReserva === "ESPORADICA") {
        const missing = reservasDia.some((reserva) => !reserva.nroAula);
        setDisabled(missing);
      }
    },
    reservasDia,
    reservasDiasSemana,
    tipoReserva
  );

  /* const generarReservasPeriodo = async (day, hour, duration) => {
    const response = await axios.get(
      "http://localhost:8080/api/cuatrimestres/2025"
    );

    const startDate =
      periodoReserva === "PRIMER_CUATRIMESTRE"
        ? new Date(response.data[0].fechaInicio)
        : new Date(response.data[1].fechaInicio);

    const endDate =
      periodoReserva === "PRIMER_CUATRIMESTRE"
        ? new Date(response.data[0].fechaFinal)
        : new Date(response.data[1].fechaFinal);
    const dayOfWeek = listaDias.indexOf(day);

    let currentDate = new Date(startDate);
    const newReservations = [];

    while (currentDate <= endDate) {
      if (currentDate.getDay() === dayOfWeek) {
        newReservations.push({
          fecha: currentDate.toISOString(),
          horaInicio: hour,
          duracion: duration,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return newReservations;
  }; */

  const removerDiasPeriodo = (dia) => {
    const dayOfWeek = listaDias.indexOf(dia);
    setDiasReserva((prev) =>
      prev.filter((reserva) => new Date(reserva.fecha).getDay() !== dayOfWeek)
    );
  };

  const handleModal = (state) => {
    setModal(state);
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  const handleModalOpen = (day) => {
    setSelectedDay(day);
    setDuracionModalOpen(true);
  };

  const handleModalClose = () => {
    setDuracionModalOpen(false);
  };

  const handleModalAccept = (hour, duration) => {
    if (esPeriodo) {
      const newReserva = {
        diaSemana: selectedDay.toUpperCase(),
        horaInicio: hour,
        duracion: duration,
      };
      setReservasDiasSemana((prev) => {
        const updatedReservations = [...prev];
        const index = updatedReservations.findIndex(
          (reserva) => reserva.diaSemana === newReserva.diaSemana
        );

        if (index !== -1) {
          // Update existing reservation
          updatedReservations[index] = newReserva;
        } else {
          // Add new reservation
          updatedReservations.push(newReserva);
        }

        return updatedReservations;
      });
    } else {
      const newReserva = {
        fecha: selectedDay,
        horaInicio: hour,
        duracion: duration,
      };

      setReservasDia((prev) => {
        const updatedReservations = [...prev];
        const index = updatedReservations.findIndex(
          (reserva) => reserva.fecha === newReserva.fecha
        );

        if (index !== -1) {
          // Update existing reservation
          updatedReservations[index] = newReserva;
        } else {
          // Add new reservation
          updatedReservations.push(newReserva);
        }

        return updatedReservations;
      });
    }
  };

  const handleCheckboxChange = (event, dia) => {
    if (!periodoReserva) {
      alert("Seleccione un periodo de reserva primero.");
      return;
    }

    setEsPeriodo(true);
    if (event.target.checked) {
      setSelectedDay(dia);
      handleModalOpen(dia);
    } else {
      setReservasDiasSemana((prev) =>
        prev.filter((reserva) => reserva.diaSemana !== dia.toUpperCase())
      );
    }
  };

  useEffect(() => {
    console.log(diasReserva);
    console.log(reservasDiasSemana);
    console.log(reservasDia);
  }, [diasReserva, reservasDia, reservasDiasSemana]);

  useEffect(() => {
    setDiasReserva([]);
    setReservasDia([]);
    setReservasDiasSemana([]);
    //setHorariosDisponibles(undefined);
  }, [periodoReserva, tipoReserva]);

  const handleCalendarPick = (dia) => {
    setEsPeriodo(false);
    handleModalOpen(dia);
  };

  const handleAulaModalOpen = (reservation) => {
    setCurrentReservation(reservation);
    setAulaModalOpen(true);
  };

  const handleAulaModalClose = () => {
    setAulaModalOpen(false);
    setCurrentReservation(null);
  };

  const handleAulaAccept = (nroAula) => {
    const updatedReservation = {
      ...currentReservation,
      nroAula: Number(nroAula),
    };

    if (esPeriodo) {
      setReservasDiasSemana((prev) =>
        prev.map((reserva) =>
          reserva.diaSemana === currentReservation.diaSemana
            ? updatedReservation
            : reserva
        )
      );
    } else {
      setReservasDia((prev) =>
        prev.map((reserva) =>
          reserva.fecha === currentReservation.fecha
            ? updatedReservation
            : reserva
        )
      );
    }

    setAulaModalOpen(false);
    setCurrentReservation(null);
  };

  const handleEdit = (dia) => {
    setSelectedDay(dia);
    setDuracionModalOpen(true);
  };

  const handleDelete = (dia) => {
    setReservasDia((prev) => prev.filter((reserva) => reserva.fecha !== dia));
  };

  const handleConsulta = async () => {
    const data = {
      tipoAula: tipoAula,
      capacidad: Number(cantidadAlumnos),
      diasReserva: esPeriodo ? reservasDiasSemana : reservasDia,
    };
    const response = await axios.post(
      "http://localhost:8080/api/aulas/disponibilidad",
      data
    );

    /* response.data.forEach((reserva) => {
      console.log("dispo", reserva);
      handleAulaModalOpen(reserva);
    }); */

    if (esPeriodo) {
      setReservasDiasSemana(response.data);
    } else {
      setReservasDia(response.data);
    }
  };

  useEffect(() => {
    const reservas = esPeriodo ? reservasDiasSemana : reservasDia;
    const reservaSinAula = reservas.find(
      (reserva) => !reserva.nroAula && reserva.aulasDisponibles
    );
    if (reservaSinAula) {
      handleAulaModalOpen(reservaSinAula);
    }
  }, [reservasDiasSemana, reservasDia, esPeriodo]);

  const handleSearchChange = async (event, value) => {
    try {
      //logica busca materias
      const response = [
        { name: "Matematica 1" },
        { name: "Matematica 2" },
        { name: "Matematica 3" },
      ];
      setOptions(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const commonData = {
      tipoReserva,
      cantidadAlumnos: Number(cantidadAlumnos),
      apellidoDocente,
      nombreDocente,
      correoDocente,
      actividadAcademica,
      realizadaPor: "054505e7-fc63-4523-95c2-4856c71d14f4", // JSON.parse(localStorage.getItem("user")).user,
    };

    let data;

    if (tipoReserva === "POR_PERIODO") {
      data = {
        ...commonData,
        anioCicloLectivo: "2025",
        periodoReserva,
        reservasDiasSemana: reservasDiasSemana.map((reserva) => ({
          ...reserva,
          fecha: new Date(reserva.fecha).toISOString(), // Format fecha to ISO string
        })),
      };
    } else if (tipoReserva === "ESPORADICA") {
      data = {
        ...commonData,
        reservasDia: reservasDia.map((reserva) => ({
          ...reserva,
          fecha: new Date(reserva.fecha).toISOString(), // Format fecha to ISO string
        })),
      };
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/reservas",
        data
      );
      console.log("Reserva creada:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error creando la reserva:", error);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
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
            overflow: "auto",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h4"
              textAlign="center"
              mt={6}
              mb={3}
              fontWeight={"bold"}
            >
              Registrar Reserva
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
                    disableScrollLock: true, // Evita bloquear el desplazamiento del body
                  }}
                >
                  <MenuItem value={"POR_PERIODO"}>Por periodo</MenuItem>
                  <MenuItem value={"ESPORADICA"}>Esporadica</MenuItem>
                </Select>
                {tipoReserva === "POR_PERIODO" && (
                  <>
                    <Typography
                      color="#5E6366"
                      ml={1}
                      mt={2}
                      component="label"
                      htmlFor="periodoReserva"
                    >
                      Periodo de reserva
                    </Typography>
                    <Select
                      name="periodoReserva"
                      id="periodoReserva"
                      value={periodoReserva}
                      onChange={onInputChange}
                      MenuProps={{
                        disableScrollLock: true, // Evita bloquear el desplazamiento del body
                      }}
                    >
                      <MenuItem value={"PRIMER_CUATRIMESTRE"}>
                        Primer cuatrimestre
                      </MenuItem>
                      <MenuItem value={"SEGUNDO_CUATRIMESTRE"}>
                        Segundo cuatrimestre
                      </MenuItem>
                      <MenuItem value={"ANUAL"}>Anual</MenuItem>
                    </Select>
                    <Box
                      sx={{
                        border: "1px solid #E0E0E0", // Light gray border
                        marginTop: 2,
                        padding: 2, // Add some padding for better spacing
                        width: "100%", // Match the width of the Select field
                        borderRadius: 1, // Optional: Add some border radius for a smoother look
                      }}
                    >
                      <Typography
                        color="#5E6366"
                        ml={1}
                        mt={5}
                        component="label"
                        htmlFor="diasReserva"
                      >
                        Seleccionar dias a reservar
                      </Typography>
                      <FormGroup>
                        {listaDias.map((dia) => {
                          const reserva = reservasDiasSemana.find(
                            (reserva) => reserva.diaSemana === dia.toUpperCase()
                          );
                          return (
                            <div key={dia}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={!!reserva}
                                    onChange={(event) =>
                                      handleCheckboxChange(event, dia)
                                    }
                                  />
                                }
                                label={dia}
                              />
                              {reserva && (
                                <>
                                  <Typography>
                                    Horario: {reserva.horaInicio} hs
                                  </Typography>
                                  <Typography>
                                    Duracion: {reserva.duracion} min
                                  </Typography>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </FormGroup>
                    </Box>
                  </>
                )}
                {tipoReserva === "ESPORADICA" && (
                  <>
                    <Typography
                      color="#5E6366"
                      ml={1}
                      mt={2}
                      component="label"
                      htmlFor="periodoReserva"
                    >
                      Dias seleccionados
                    </Typography>
                    <List>
                      {reservasDia.map((reserva, index) => (
                        <ListItem key={index}>
                          <Typography>
                            {reserva.fecha.slice(0, 10)} - {reserva.horaInicio}{" "}
                            hs, {reserva.duracion} min
                          </Typography>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEdit(reserva.fecha)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(reserva.fecha)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItem>
                      ))}
                      {reservasDia.length === 0 && (
                        <ListItem>
                          <Typography>No se han seleccionado dias</Typography>
                        </ListItem>
                      )}
                    </List>
                    <Box
                      sx={{
                        border: "1px solid #E0E0E0", // Light gray border
                        marginTop: 2,
                        padding: 2, // Add some padding for better spacing
                        width: "100%", // Match the width of the Select field
                        borderRadius: 1, // Optional: Add some border radius for a smoother look
                      }}
                    >
                      <Typography
                        color="#5E6366"
                        ml={1}
                        mt={5}
                        component="label"
                        htmlFor="diasReserva"
                      >
                        Seleccionar dias a reservar
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          openTo="day"
                          disablePast={true}
                          onChange={(date) =>
                            handleCalendarPick(date.toISOString())
                          }
                        />
                      </LocalizationProvider>
                    </Box>
                  </>
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
                    disableScrollLock: true, // Evita bloquear el desplazamiento del body
                  }}
                >
                  <MenuItem value={"MULTIMEDIOS"}>Aula Multimedios</MenuItem>
                  <MenuItem value={"INFORMATICA"}>Aula Informatica</MenuItem>
                  <MenuItem value={"SIN_RECURSOS_ADICIONALES"}>
                    Aula Regular
                  </MenuItem>
                </Select>
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{
                    width: "100 %",
                    color: "#32936F",
                    borderColor: "#32936F",
                    marginTop: 4,
                    paddingY: 1.5,
                    borderRadius: 3,
                  }}
                  onClick={async () => await handleConsulta()}
                >
                  Consultar disponibilidad
                </Button>
                <br />
              </Box>
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
                <TextField
                  name="nombreDocente"
                  id="nombreDocente"
                  value={nombreDocente}
                  onChange={onInputChange}
                  placeholder="Nombre"
                  sx={{ marginTop: 6, marginLeft: 1 }}
                />
                <TextField
                  name="apellidoDocente"
                  id="apellidoDocente"
                  sx={{ marginTop: 4, marginLeft: 1 }}
                  value={apellidoDocente}
                  onChange={onInputChange}
                  placeholder="Apellido"
                />

                <Autocomplete
                  freeSolo
                  options={options.map((option) => option.name)}
                  onInputChange={handleSearchChange}
                  onChange={(event, newValue) => {
                    onInputChange({
                      target: { name: "actividadAcademica", value: newValue },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="actividadAcademica"
                      id="actividadAcademica"
                      value={actividadAcademica}
                      onChange={onInputChange}
                      placeholder="Buscar"
                      sx={{ marginTop: 4, marginLeft: 1 }}
                    />
                  )}
                />

                <TextField
                  name="correoDocente"
                  id="correoDocente"
                  type="text"
                  value={correoDocente}
                  onChange={onInputChange}
                  sx={{ marginTop: 4, marginLeft: 1 }}
                  placeholder="Correo electronico de contacto"
                />
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
            <CancelModal
              modal={modal}
              handleModal={handleModal}
              handleExit={handleExit}
            />
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
              Registrar reserva
            </Button>
            <SuccessModal
              success={success}
              handleClose={handleClose}
              handleSuccessExit={handleSuccessExit}
            />
            <ErrorModal error={error} handleErrorModal={handleErrorModal} />
          </Box>
        </Box>
      </Box>

      <DuracionModal
        open={duracionModalOpen}
        handleClose={handleModalClose}
        handleAccept={handleModalAccept}
        dia={selectedDay}
        //horariosDisponibles={horariosDisponibles}
      />
      {currentReservation && (
        <AulaSelectionModal
          open={aulaModalOpen}
          handleClose={handleAulaModalClose}
          handleAccept={handleAulaAccept}
          reserva={currentReservation}
        />
      )}
    </form>
  );
};
