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

const DuracionModal = ({ open, handleClose, handleAccept, dia }) => {
  const [hour, setHour] = useState("");
  const [duration, setDuration] = useState("");

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    // if (value === "" || (Number(value) % 30 === 0 && Number(value) > 0)) {
    setDuration(value);
    // }
  };

  const handleAcceptClick = () => {
    handleAccept(hour, duration);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Hora y duracion del {dia}</DialogTitle>
      <DialogContent>
        <TextField
          label="Hour"
          type="time"
          value={hour}
          onChange={handleHourChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duracion en minutos"
          type="number"
          value={duration}
          onChange={handleDurationChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="caption" color="textSecondary" fullWidth>
          La duracion debe ser multiplo de 30.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAcceptClick} color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DuracionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default DuracionModal;
