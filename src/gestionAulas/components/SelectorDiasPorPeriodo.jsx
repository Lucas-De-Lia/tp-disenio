import { Box, Typography, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const SelectorDiasPorPeriodo = ({ periodoReserva, onInputChange, listaDias, reservasDiasSemana, handleCheckboxChange, mayus }) => {
  return (
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
        <MenuItem value={"PRIMER_CUATRIMESTRE"}>Primer cuatrimestre</MenuItem>
        <MenuItem value={"SEGUNDO_CUATRIMESTRE"}>Segundo cuatrimestre</MenuItem>
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
          htmlFor="reservasDiasSemana"
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
                      onChange={(event) => handleCheckboxChange(event, dia)}
                    />
                  }
                  label={mayus(dia)}
                />
                {reserva && (
                  <>
                    <Typography>Horario: {reserva.horaInicio} hs</Typography>
                    <Typography>Duracion: {reserva.duracion} min</Typography>
                  </>
                )}
              </div>
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
};

SelectorDiasPorPeriodo.propTypes = {
  periodoReserva: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  listaDias: PropTypes.array.isRequired,
  reservasDiasSemana: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  mayus: PropTypes.func.isRequired,
};

export default SelectorDiasPorPeriodo;