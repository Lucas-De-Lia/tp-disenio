import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid2,
} from "@mui/material";
import { listaDias } from "../../constants/dias";

const AulaSelectionModal = ({ open, handleClose, handleAccept, reserva }) => {
  const [selectedAula, setSelectedAula] = useState("");

  const handleAulaChange = (event) => {
    setSelectedAula(event.target.value);
  };

  const handleAcceptClick = () => {
    handleAccept(selectedAula);
    handleClose();
  };

  const calculateHoraFin = (horaInicio, duracion) => {
    const [hours, minutes, seconds] = horaInicio.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    date.setMinutes(date.getMinutes() + duracion);
    return date.toTimeString().split(" ")[0];
  };
  console.log("dispo", reserva);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        textAlign={"center"}
      >
        Opciones de aulas
      </DialogTitle>
      <DialogContent sx={{ padding: "16px" }}>
        <Grid2 container spacing={2} alignItems="center" marginBottom={2}>
          <Grid2 item xs={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Día:{" "}
              {listaDias.includes(reserva.diaSemana)
                ? reserva.diaSemana
                : reserva.fecha.slice(0, 10)}
            </Typography>
          </Grid2>
        </Grid2>
        <RadioGroup value={selectedAula} onChange={handleAulaChange}>
          {reserva.reservasSolapadas && (
            <Typography
              sx={{ marginBottom: "5px", color: "red" }}
              textAlign={"center"}
            >
              ADVERTENCIA: No existen aulas que cumplan con el criterio
              ingresado
            </Typography>
          )}
          {reserva.reservasSolapadas && (
            <Typography sx={{ marginBottom: "5px" }}>
              Aulas con menor Superposicion:
            </Typography>
          )}
          {reserva.aulasDisponibles &&
            reserva.aulasDisponibles.map((aula) => (
              <FormControlLabel
                key={aula.nroAula}
                value={aula.nroAula}
                control={<Radio sx={{ color: "#1976d2" }} />}
                label={
                  <div style={{ marginLeft: "8px" }}>
                    {reserva.fecha && (
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", marginBottom: "4px" }}
                      >
                        {reserva.fecha.slice(0, 10)}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Horario: {reserva.horaInicio} -{" "}
                      {calculateHoraFin(reserva.horaInicio, reserva.duracion)}{" "}
                      hs
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Duración: {reserva.duracion} min
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Aula: {aula.nroAula} - Capacidad: {aula.capacidad}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Ubicación: {aula.ubicacion || "N/A"}
                    </Typography>
                    {aula.cantidadPCs && (
                      <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                        Cantidad de PCs: {aula.cantidadPCs || "N/A"}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Caracteristicas: {aula.tipoPizarron}
                      {aula.ventiladores && ", Ventiladores"}
                      {aula.aireAcondicionado && ", Aire acondicionado"}
                      {aula.televisor && ", Televisor"}
                      {aula.proyector && ", Proyector"}
                    </Typography>
                    <br />
                  </div>
                }
              />
            ))}
          {reserva.reservasSolapadas &&
            reserva.reservasSolapadas.map((resSolapada) => (
              <FormControlLabel
                key={resSolapada.aula.nroAula}
                value={resSolapada.aula.nroAula}
                control={<Radio sx={{ color: "#1976d2" }} />}
                label={
                  <div style={{ marginLeft: "8px" }}>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Horario: {reserva.horaInicio} -{" "}
                      {calculateHoraFin(reserva.horaInicio, reserva.duracion)}{" "}
                      hs
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Duración: {reserva.duracion} min
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Aula: {resSolapada.aula.nroAula} - Capacidad:{" "}
                      {resSolapada.aula.capacidad}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Ubicación: {resSolapada.aula.ubicacion || "N/A"}
                    </Typography>
                    {resSolapada.aula.cantidadPCs && (
                      <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                        Cantidad de PCs: {resSolapada.aula.cantidadPCs || "N/A"}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Caracteristicas: {resSolapada.aula.tipoPizarron}
                      {resSolapada.aula.ventiladores && ", Ventiladores"}
                      {resSolapada.aula.aireAcondicionado &&
                        ", Aire acondicionado"}
                      {resSolapada.aula.televisor && ", Televisor"}
                      {resSolapada.aula.proyector && ", Proyector"}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Horario reservado: {resSolapada.horaInicio} -{" "}
                      {calculateHoraFin(
                        resSolapada.horaInicio,
                        resSolapada.duracion
                      )}{" "}
                      hs
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Superposicion:{" "}
                      {resSolapada.tiempoSolapamiento * 60 || "N/A"} min
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Su reserva se solapa con la reserva:{" "}
                      {resSolapada.reserva.idReserva}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: "2px" }}>
                      Datos del solicitante:{" "}
                      {resSolapada.reserva.apellidoDocente},{" "}
                      {resSolapada.reserva.nombreDocente} -{" "}
                      {resSolapada.reserva.actividadAcademica} -{" "}
                      {resSolapada.reserva.correoDocente}
                    </Typography>
                    <br />
                  </div>
                }
              />
            ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            width: "180px",
            backgroundColor: "#32936F",
            borderRadius: 3,
            paddingY: 1,
            marginBottom: 1,
          }}
          onClick={handleAcceptClick}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AulaSelectionModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAccept: PropTypes.func,
  reserva: PropTypes.shape({
    fecha: PropTypes.string,
    diaSemana: PropTypes.string,
    horaInicio: PropTypes.string,
    duracion: PropTypes.number,
    disponible: PropTypes.bool,
    aulasDisponibles: PropTypes.arrayOf(
      PropTypes.shape({
        nroAula: PropTypes.number,
        capacidad: PropTypes.number,
        piso: PropTypes.number,
        ubicacion: PropTypes.string,
        tipoPizarron: PropTypes.string,
        habilitada: PropTypes.bool,
        ventiladores: PropTypes.bool,
        aireAcondicionado: PropTypes.bool,
        televisor: PropTypes.bool,
        cantidadPCs: PropTypes.number,
        proyector: PropTypes.bool,
      })
    ),
    reservasSolapadas: PropTypes.arrayOf(
      PropTypes.shape({
        horaInicio: PropTypes.string,
        duracion: PropTypes.number,
        tiempoSolapamiento: PropTypes.number,
        aula: PropTypes.shape({
          nroAula: PropTypes.number,
          capacidad: PropTypes.number,
          piso: PropTypes.number,
          ubicacion: PropTypes.string,
          tipoPizarron: PropTypes.string,
          habilitada: PropTypes.bool,
          ventiladores: PropTypes.bool,
          aireAcondicionado: PropTypes.bool,
          televisor: PropTypes.bool,
          cantidadPCs: PropTypes.number,
          proyector: PropTypes.bool,
        }),
        reserva: PropTypes.shape({
          idReserva: PropTypes.string,
          tipoReserva: PropTypes.string,
          cantidadAlumnos: PropTypes.number,
          fechaSolicitud: PropTypes.string,
          apellidoDocente: PropTypes.string,
          nombreDocente: PropTypes.string,
          correoDocente: PropTypes.string,
          actividadAcademica: PropTypes.string,
        }),
      })
    ),
  }),
};

export default AulaSelectionModal;
