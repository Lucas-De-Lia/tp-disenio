export const passwordAnalizer = (password) => {
    if (password.length > 0) {
        if (password.length < 8) {
          return "La contraseña debe tener al menos 8 caracteres.";
        } else if (!/[A-Z]/.test(password)) {
          return "La contraseña debe incluir al menos una mayúscula.";
        } else if (!/[0-9]/.test(password)) {
          return "La contraseña debe incluir al menos un número.";
        } else if (!/[@#$%&*]/.test(password)) {
          return "La contraseña debe incluir un signo especial (@#$%&*).";
        } else {
          return""; // No hay errores
        }
      } else {
        return""; // Si el campo está vacío
      }
}