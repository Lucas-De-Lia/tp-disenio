import { Box, List, ListItem, Typography } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';

/**
 * Componente que muestra una lista de errores.
 *
 * @param {Object} props.errorList - Objeto que contiene los errores a mostrar, donde los valores corresponden a los mensajes de error.
 * @returns {JSX.Element|null} - Retorna un componente JSX que muestra la lista de errores o null si no hay errores.
 */
const ErrorList = ({ errorList }) => {
  if (!errorList) return null;

  return (
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
  );
};

ErrorList.propTypes = {
  errorList: PropTypes.object,
};

export default ErrorList;