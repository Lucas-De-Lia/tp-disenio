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
//import Header from "../../components/Header";
import { Delete, Edit, ErrorOutline } from "@mui/icons-material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { SuccessModal } from "../modals/SuccessModal";
import { ErrorModal } from "../modals/ErrorModal";
import { CancelModal } from "../modals/CancelModal";
import { handleSubmit } from "../helpers";
import DuracionModal from "../modals/DuracionModal";

// type Dia = {
//   horaInicio: string,
//   duracion: number,
// };

// type DiasReserva = {
//   "Lunes"?: Dia,
//   "Martes"?: Dia,
//   "Miercoles"?: Dia,
//   "Jueves"?: Dia,
//   "Viernes"?: Dia,
// }

export const RegistrarReservaPage = () => {
  const navigate = useNavigate();

  const {
    nombre,
    apellido,
    tipoReserva,
    username,
    cantidadAlumnos,
    tipoAula,
    email,
    periodoReserva,
    search,
    onInputChange,
    onResetForm,
  } = useForm({
    nombre: "",
    apellido: "",
    tipoReserva: "",
    tipoAula: "",
    username: "",
    cantidadAlumnos: 0,
    email: "",
    periodoReserva: "",
    search: "",
  });

  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState(null);
  const [disabled, setDisabled] = useState(false);

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

  const handleModal = (state) => {
    setModal(state);
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  const [duracionModalOpen, setDuracionModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [esPeriodo, setEsPeriodo] = useState(false);
  const [diasReservaPeriodo, setDiasReservaPeriodo] = useState({});
  const [diasReservaEsporadica, setDiasReservaEsporadica] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log("dias esp", diasReservaEsporadica);
    console.log("dias per", diasReservaPeriodo);
  }, [diasReservaEsporadica, diasReservaPeriodo]);

  const handleModalOpen = (day) => {
    setSelectedDay(day);
    setDuracionModalOpen(true);
  };

  const handleModalClose = () => {
    setDuracionModalOpen(false);
  };

  const handleModalAccept = (hour, duration) => {
    if (esPeriodo) {
      setDiasReservaPeriodo((prev) => ({
        ...prev,
        [selectedDay]: { horaInicio: hour, duracion: duration },
      }));
    } else {
      setDiasReservaEsporadica((prev) => ({
        ...prev,
        [selectedDay]: { horaInicio: hour, duracion: duration },
      }));
    }
  };

  const handleCheckboxChange = (event, dia) => {
    setEsPeriodo(true);
    if (event.target.checked) handleModalOpen(dia);
    else {
      setDiasReservaPeriodo((prev) => {
        const updated = { ...prev };
        delete updated[dia];
        return updated;
      });
    }
  };

  const handleCalendarPick = (dia) => {
    setEsPeriodo(false);
    handleModalOpen(dia);
    /* if (!diasReservaEsporadica.find((reserva) => reserva.dia === dia)) {
      handleModalOpen(dia);
    } else {
      setDiasReservaEsporadica((prev) =>
        prev.filter((reserva) => reserva.dia !== dia)
      );
    } */
  };

  const handleEdit = (dia) => {
    setSelectedDay(dia);
    setDuracionModalOpen(true);
  };

  const handleDelete = (dia) => {
    setDiasReservaEsporadica((prev) =>
      prev.filter((reserva) => reserva.dia !== dia)
    );
  };

  const handleConsulta = () => {
    console.log("logica consulta");
  };

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

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(
          e,
          {
            username,
            nombre,
            apellido,
            tipoReserva,
          },
          { setSuccess, setError, setErrorList, setDisabled }
        );
      }}
    >
      {/* <Header /> */}
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
                  <MenuItem value={"periodo"}>Por periodo</MenuItem>
                  <MenuItem value={"esporadica"}>Esporadica</MenuItem>
                </Select>
                {tipoReserva === "periodo" && (
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
                      <MenuItem value={"cuatrimestre1"}>
                        Primer cuatrimestre
                      </MenuItem>
                      <MenuItem value={"cuatrimestre2"}>
                        Segundo cuatrimestre
                      </MenuItem>
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
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) =>
                                  handleCheckboxChange(event, "Lunes")
                                }
                              />
                            }
                            label="Lunes"
                          />
                          {diasReservaPeriodo["Lunes"] && (
                            <>
                              <Typography>
                                Horario:{" "}
                                {diasReservaPeriodo["Lunes"].horaInicio} hs
                              </Typography>
                              <Typography>
                                Duracion: {diasReservaPeriodo["Lunes"].duracion}{" "}
                                min
                              </Typography>
                            </>
                          )}
                        </>
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) =>
                                  handleCheckboxChange(event, "Martes")
                                }
                              />
                            }
                            label="Martes"
                          />
                          {diasReservaPeriodo["Martes"] && (
                            <>
                              <Typography>
                                Horario:{" "}
                                {diasReservaPeriodo["Martes"].horaInicio} hs
                              </Typography>
                              <Typography>
                                Duracion:{" "}
                                {diasReservaPeriodo["Martes"].duracion} min
                              </Typography>
                            </>
                          )}
                        </>
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) =>
                                  handleCheckboxChange(event, "Miercoles")
                                }
                              />
                            }
                            label="Miercoles"
                          />
                          {diasReservaPeriodo["Miercoles"] && (
                            <>
                              <Typography>
                                Horario:{" "}
                                {diasReservaPeriodo["Miercoles"].horaInicio} hs
                              </Typography>
                              <Typography>
                                Duracion:{" "}
                                {diasReservaPeriodo["Miercoles"].duracion} min
                              </Typography>
                            </>
                          )}
                        </>
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) =>
                                  handleCheckboxChange(event, "Jueves")
                                }
                              />
                            }
                            label="Jueves"
                          />
                          {diasReservaPeriodo["Jueves"] && (
                            <>
                              <Typography>
                                Horario:{" "}
                                {diasReservaPeriodo["Jueves"].horaInicio} hs
                              </Typography>
                              <Typography>
                                Duracion:{" "}
                                {diasReservaPeriodo["Jueves"].duracion} min
                              </Typography>
                            </>
                          )}
                        </>
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) =>
                                  handleCheckboxChange(event, "Viernes")
                                }
                              />
                            }
                            label="Viernes"
                          />
                          {diasReservaPeriodo["Viernes"] && (
                            <>
                              <Typography>
                                Horario:{" "}
                                {diasReservaPeriodo["Viernes"].horaInicio} hs
                              </Typography>
                              <Typography>
                                Duracion:{" "}
                                {diasReservaPeriodo["Viernes"].duracion} min
                              </Typography>
                            </>
                          )}
                        </>
                      </FormGroup>
                    </Box>
                  </>
                )}
                {tipoReserva === "esporadica" && (
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
                      {Object.entries(diasReservaEsporadica).map(
                        ([dia, reserva], index) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <>
                                <IconButton
                                  edge="end"
                                  aria-label="edit"
                                  onClick={() => handleEdit(dia)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => handleDelete(dia)}
                                >
                                  <Delete />
                                </IconButton>
                              </>
                            }
                          >
                            <Typography>
                              {dia}: {reserva.horaInicio} hs, {reserva.duracion}{" "}
                              min
                            </Typography>
                          </ListItem>
                        )
                      )}
                      {Object.keys(diasReservaEsporadica).length === 0 && (
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
                          //value={today}
                          onChange={(date) =>
                            handleCalendarPick(date.format("DD/MM/YYYY"))
                          }
                          //renderInput={(params) => <TextField {...params} />}
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
                  onChange={onInputChange}
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
                  <MenuItem value={"aulaMultimedios"}>
                    Aula Multimedios
                  </MenuItem>
                  <MenuItem value={"aulaInfomatica"}>Aula Informatica</MenuItem>
                  <MenuItem value={"aulaRegular"}>Aula Regular</MenuItem>
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
                  onClick={() => handleConsulta()}
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
                  name="nombre"
                  id="nombre"
                  value={nombre}
                  onChange={onInputChange}
                  placeholder="Nombre"
                  sx={{ marginTop: 6, marginLeft: 1 }}
                />
                <TextField
                  name="apellido"
                  id="apellido"
                  sx={{ marginTop: 4, marginLeft: 1 }}
                  value={apellido}
                  onChange={onInputChange}
                  placeholder="Apellido"
                />

                <Autocomplete
                  freeSolo
                  options={options.map((option) => option.name)}
                  onInputChange={handleSearchChange}
                  onChange={(event, newValue) => {
                    onInputChange({
                      target: { name: "search", value: newValue },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="search"
                      id="search"
                      value={search}
                      onChange={onInputChange}
                      placeholder="Buscar"
                      sx={{ marginTop: 4, marginLeft: 1 }}
                    />
                  )}
                />

                <TextField
                  name="email"
                  id="email"
                  type="text"
                  value={email}
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
              Registrar bedel
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
      />
    </form>
  );
};
