import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../constants/userTypes"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    
    const loginAction = async (data) => {
        // De acá hasta el return es solo temporal, hasta implementar el endpoint en el backend.
        const user = {
            tipoUsuario: data,
            nombre: data ===  UserTypes.ADMIN ? "Nombre del Admin" : "Nombre del Bedel"
        };
        const token = "token_prueba";
        setUser(user);
        setToken(token);
        localStorage.setItem("site", token);
        localStorage.setItem("nombre", user.nombre);
        localStorage.setItem("tipoUsuario", user.tipoUsuario);
        navigate("/dashboard");
        
        return;
        
        try {
            const response = await fetch("your-api-endpoint/auth/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
            const res = await response.json();
            
            if (res.data) {
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }else {
                throw new Error(res.message);
            }

        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    const restoreSession = () => {
        console.log("Restaurando sesion...")
        const savedToken = localStorage.getItem("site");
        const nombreUsuario = localStorage.getItem("nombre");
        const tipoUsuario = localStorage.getItem("tipoUsuario");
        
        if (savedToken) {
            setToken(savedToken);
            setUser({
                tipoUsuario: tipoUsuario,
                nombre: nombreUsuario,
            });
        }
    };

    useEffect(()=>{
        restoreSession();
    }, []);
    
    return (
        <AuthContext.Provider  value={{ token, user, loginAction, logOut, restoreSession}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
