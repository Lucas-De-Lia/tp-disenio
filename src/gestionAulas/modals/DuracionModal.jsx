import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { listaDias } from "../../constants/dias";

const DuracionModal = ({ open, handleClose, handleAccept, dia }) => {
  const [hour, setHour] = useState("");
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState(false);
  const [hourError, setHourError] = useState(false);

  //!le quite el + ":00" para que no se bugue la hora en el input, agregar antes de enviar la solicitud
  const handleHourChange = (e) => {
    setHour(e.target.value);
    setHourError(false);
  };

  const handleDurationChange = (e) => {
    const value = Number(e.target.value);
    setDuration(value);
  };

  const handleAcceptClick = async () => {
    const value = Number(duration);
    if (!hour) {
      setHourError(true);
      return;
    }
    if (value === "" || (value % 30 === 0 && value > 0)) {
      setDurationError(false);
      await handleAccept(hour, duration);
      handleClose();
    } else {
      setDurationError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        Hora y duracion del {listaDias.includes(dia) ? dia : dia.slice(0, 10)}
      </DialogTitle>
      <DialogContent>
        <TextField
          type="time"
          value={hour}
          onChange={handleHourChange}
          fullWidth
          margin="normal"
          error={hourError}
          helperText={hourError ? "Campo obligatorio" : ""}
        />
        <TextField
          label="Duracion en minutos"
          type="number"
          value={duration}
          onChange={handleDurationChange}
          fullWidth
          margin="normal"
          error={durationError}
        />
        <Typography variant="caption" color="textSecondary">
          La duracion debe ser multiplo de 30.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            width: "180px",
            color: "#32936F",
            borderColor: "#32936F",
            borderRadius: 3,
            paddingY: 1,
            marginBottom: 1,
          }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
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
DuracionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  dia: PropTypes.string.isRequired,
};

export default DuracionModal;
