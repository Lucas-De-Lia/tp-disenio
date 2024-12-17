import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { useForm } from "../../hooks/useForm";
import { SuccessModal } from "../modals/SuccessModalReserva";
import { ErrorModal } from "../modals/ErrorModal";
import { CancelModal } from "../modals/CancelModal";
import DuracionModal from "../modals/DuracionModal";
import axios from "axios";
import { listaDias } from "../../constants/dias";
import AulaSelectionModal from "./AulasDisponibles";
import ErrorList from "../components/ErrorList";
import InformacionReservaSolicitante from "../components/InformacionReservaSolicitante";
import {
  generarReservasPeriodo,
  removerDiasPeriodo,
  filtrarAulas,
  formatDate,
  mayus,
} from "../helpers";
import { ContentPasteGoOutlined } from "@mui/icons-material";

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
  const [registrarDisabled, setRegistrarDisabled] = useState(false);
  const [duracionModalOpen, setDuracionModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [esPeriodo, setEsPeriodo] = useState(false);
  // Fechas a reservar para reservas por periodo
  const [diasReserva, setDiasReserva] = useState([]);
  const [options, setOptions] = useState([]);
  const [reservasDiasSemana, setReservasDiasSemana] = useState([]);
  // Fechas a reservar para reservas esporádicas
  const [reservasDia, setReservasDia] = useState([]);
  const [aulaModalOpen, setAulaModalOpen] = useState(false);
  // Reserva actual para la que se seleccionará un aula
  const [currentReservation, setCurrentReservation] = useState();


  const handleClose = () => {
    setSuccess(false);
    setErrorList(null);
    onResetForm();
  };

  const handleSuccessExit = () => {
    setSuccess(false);
    navigate("/dashboard");
  };

  const handleErrorModal = (state) => {
    setError(state);
  };

  /**
   * Verificar si todas las reservas tienen un aula asignada.
   */
  useEffect(
    () => {
      if (tipoReserva === "POR_PERIODO") {
        setReservasDia([]);
        // Verificar que todas las reservas tengan un aula asignada
        const missing = reservasDiasSemana.some((reserva) => !reserva.nroAula);
        setRegistrarDisabled(missing);
      } else if (tipoReserva === "ESPORADICA") {
        setReservasDiasSemana([]);
        // Verificar que todas las reservas tengan un aula asignada
        const missing = reservasDia.some((reserva) => !reserva.nroAula);
        setRegistrarDisabled(missing);
      }
    },
    reservasDia,
    reservasDiasSemana,
    tipoReserva
  );
   

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

  const handleModalAccept = async (hour, duration) => {
    if (esPeriodo) {
      // Crear nueva reserva para el día de la semana seleccionado
      const newReserva = {
        diaSemana: selectedDay.toUpperCase(),
        horaInicio: hour,
        duracion: duration,
      };

      // Actualizar o agregar nueva reservaDiaSemana según corresponda
      setReservasDiasSemana((prev) => {
        const updatedReservations = [...prev];
        const index = updatedReservations.findIndex(
          (reserva) => reserva.diaSemana === newReserva.diaSemana
        );

        if (index !== -1) updatedReservations[index] = newReserva; 
        else updatedReservations.push(newReserva);

        return updatedReservations;
      });
      console.log("reservasDiasSemana:", reservasDiasSemana);
    } else {
      // Crear nueva reserva para el día seleccionado (fecha)
      const newReserva = {
        fecha: formatDate(selectedDay),
        horaInicio: hour,
        duracion: duration,
      };

      // Actualizar o agregar nuevo reservaDia según corresponda
      setReservasDia((prev) => {
        const updatedReservations = [...prev];
        const index = updatedReservations.findIndex(
          (reserva) => reserva.fecha === newReserva.fecha
        );

        if (index !== -1) updatedReservations[index] = newReserva;
        else updatedReservations.push(newReserva);

        return updatedReservations;
      });
      console.log("reservasDia:", reservasDia);
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
      removerDiasPeriodo(dia);
    }
  };

  useEffect(() => {
    setDiasReserva([]);
    setReservasDia([]);
    setReservasDiasSemana([]);
  }, [periodoReserva, tipoReserva]);

  const handleCalendarPick = (dia) => {
    setEsPeriodo(false);
    handleModalOpen(dia);
  };

  const handleAulaModalOpen = (reserva) => {
    setCurrentReservation(reserva);
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

    // Actualizar los datos de la reserva según corresponda
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

  const handleEditDayEsporadica = (dia) => {
    setSelectedDay(dia);
    setDuracionModalOpen(true);
  };

  const handleDeleteDayEsporadica = (dia) => {
    setReservasDia((prev) => prev.filter((reserva) => reserva.fecha !== dia));
  };

  const handleConsultaDisponibilidad = async () => {
    const data = {
      tipoAula: tipoAula,
      capacidad: Number(cantidadAlumnos),
      diasReserva: esPeriodo ? diasReserva : reservasDia,
    };
    console.log("Data a enviar para obtener disponibilidad:", data);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/aulas/disponibilidad",
        data
      );
      setError(false);
      setErrorList(null);

      // Formatear la respuesta en caso de ser necesario
      const formattedResponse = response.data.map((reserva) => ({
        ...reserva,
        fecha: esPeriodo ? undefined : formatDate(reserva.fecha),
        diaSemana: esPeriodo ? reserva.diaSemana : undefined,
      }));
      console.log("Disponibilidad Obtenida (formatted):", formattedResponse);

      if(esPeriodo) setReservasDiasSemana(formattedResponse);
      else setReservasDia(formattedResponse);

    } catch (error) {
      console.error("Error al obtener disponibilidad:", error);
      setErrorList(error.response.data);
      setError(true);
    }
  };

  /**
   * Verificar si hay reservas sin aulas asignadas y abrir el modal 
   * para seleccionar una en caso de ser necesario.
   **/
  useEffect(() => {
    const reservas = esPeriodo ? reservasDiasSemana : reservasDia;
    const reservaSinAula = reservas.find(
      (reserva) =>
        !reserva.nroAula &&
        (reserva.aulasDisponibles || reserva.reservasSolapadas)
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
      realizadaPor: JSON.parse(localStorage.getItem("user")).id,
    };
    console.log("commonData", commonData);

    let data = {};

    if (tipoReserva === "POR_PERIODO") {
      data = {
        ...commonData,
        anioCicloLectivo: "2025",// ! Hardcoded
        periodoReserva,
        reservasDiasSemana,
      };
    } else if (tipoReserva === "ESPORADICA") {
      data = {
        ...commonData,
        reservasDia: reservasDia.map((reserva) => ({
          ...reserva,
          fecha: formatDate(reserva.fecha), // Format fecha to ISO string
        })),
      };
    }
    console.log("Información a enviar para Registrar Reserva:", data);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/reservas",
        data
      );
      console.log("Reserva creada:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error creando la reserva:", error);
      setErrorList(error.response.data);
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

            {/* INFORMACIÓN DE LA RESERVA Y DEL SOLICITANTE */}
            <InformacionReservaSolicitante
              tipoReserva={tipoReserva}
              periodoReserva={periodoReserva}
              onInputChange={onInputChange}
              listaDias={listaDias}
              reservasDiasSemana={reservasDiasSemana}
              handleCheckboxChange={handleCheckboxChange}
              mayus={mayus}
              reservasDia={reservasDia}
              handleEditDayEsporadica={handleEditDayEsporadica}
              handleDeleteDayEsporadica={handleDeleteDayEsporadica}
              handleCalendarPick={handleCalendarPick}
              handleConsultaDisponibilidad={handleConsultaDisponibilidad}
              tipoAula={tipoAula}
              cantidadAlumnos={cantidadAlumnos}
              options={options}
              actividadAcademica={actividadAcademica}
              handleSearchChange={handleSearchChange}
              nombreDocente={nombreDocente}
              apellidoDocente={apellidoDocente}
              correoDocente={correoDocente}
            />
          </Box>

          <ErrorList errorList={errorList} />
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
              disabled={registrarDisabled}
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
