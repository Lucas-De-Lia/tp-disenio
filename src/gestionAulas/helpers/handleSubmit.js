import axios from "axios";

export const handleSubmit = async (e,{username,nombre,apellido,password,repeatedPassword,turno},{setSuccess,setError,setErrorList,setDisabled},{passwordError,repPasswordError}) => {
    e.preventDefault();
    setDisabled(true);
    if(!!passwordError || !!repPasswordError){
      setDisabled(false);
      return
    }else{
      const data = {
        idUsuario: "",
        username,
        nombre,
        apellido,
        password,
        repeatedPassword,
        turno,
        registradoPor: JSON.parse(localStorage.getItem("user")).user,
      };
      console.table(data);
      try {
        const headers = {
          "Content-Type": "application/json",
          // Authorization: "Bearer your-token-here", // TODO Para cuando este el token del login
        };

        const response = await axios.post(
          "http://localhost:8080/api/bedeles",
          data,
          { headers }
        );
        console.log("Response:", response.data);
        setSuccess(true);
        setError(null);
        // TODO Manejar caso success, creo q era mostrar un modal de exito que dsp te lleve al dashboard
      } catch (err) {
        console.error("Error:", err);
        setError(true);
        setErrorList(err.response.data);
      } finally{
        setDisabled(false);
      }
    }
  };