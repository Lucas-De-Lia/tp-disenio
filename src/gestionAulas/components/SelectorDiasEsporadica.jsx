import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const SelectorDiasEsporadica = ({ reservasDia, handleEdit, handleDelete, handleCalendarPick }) => {
  return (
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
      <List
       sx={{
        border: "1px solid #E0E0E0",
        padding: "5px",
        width: "100%",
        borderRadius: 1,
      }}
      >
        {reservasDia.map((reserva, index) => (
          <ListItem key={index}>
            <Typography>
              {reserva.fecha.slice(0, 10)} - {reserva.horaInicio} hs, {reserva.duracion} min, {(reserva.nroAula && reserva.nroAula !== -1) ? `Aula: ${reserva.nroAula}` : "Sin aula"}
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
          border: "1px solid #E0E0E0",
          marginTop: 2,
          padding: 2,
          width: "100%",
          borderRadius: 1,
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
            onChange={(date) => handleCalendarPick(date.toISOString())}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};

SelectorDiasEsporadica.propTypes = {
  reservasDia: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCalendarPick: PropTypes.func.isRequired,
};

export default SelectorDiasEsporadica;