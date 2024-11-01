import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { UserTypes} from '../constants';

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
    const login = ( user = '',password = '') =>{
        if(user === admin.user && password === admin.password){
        const retUser = {
            user,
            userType:admin.userType
        }
        const action = {
            type:types.login,
            payload:retUser
        }

        localStorage.setItem('user',JSON.stringify(retUser))

        dispatch(action);

        return true;
    }else {return false}
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

