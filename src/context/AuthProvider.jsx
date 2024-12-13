import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { UserTypes} from '../constants';
import axios from "axios";

export const AuthProvider = ({ children }) => { 
    const init = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            logged:!!user,
            ...user
        }
    }
    
    const [ authState, dispatch ] = useReducer(authReducer,{},init);

    const admin = {
        user: 'ADMIN',
        password: 'ADMIN',
        userType: UserTypes.ADMIN
    }

    

    //despues la deberia hacer async y recibo los datos del usuario
    const login = async( username = '',password = '') =>{
        try{
            const params = new URLSearchParams();
            params.append('username',username);
            params.append('password',password);

            const response = await axios.post(
                'http://localhost:8080/api/login',
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            );
            if(response.data.status === "accepted"){
                //guardo el usurio en el localstorage y en el context
                //me falta ver que tipo de usuario es
                if(response.data.user.turno !== null){
                    const retUser = {
                        username,
                        userType:"Bedel"
                    }
                    const action = {
                        type:types.login,
                        payload:retUser
                    }
                    localStorage.setItem('user',JSON.stringify(retUser));
                    dispatch(action);
                    console.log('Login exitoso:', response.data);
                    return true;
                }else{
                    const retUser = {
                        username,
                        userType:"ADMIN"
                    }
                    const action = {
                        type:types.login,
                        payload:retUser
                    }
                    localStorage.setItem('user',JSON.stringify(retUser));
                    dispatch(action);
                    console.log('Login exitoso:', response.data.message);
                    return true;
                }
                
            }else{
                console.log('Login fallido:', response.data.message);
                return false;
            }
        }catch(e){
            console.log(e);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = {
            type: types.logout
        }
        dispatch(action);
    }

    return (
        <AuthContext.Provider  value={{...authState,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

