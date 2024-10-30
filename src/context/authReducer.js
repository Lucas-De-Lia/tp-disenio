import { types } from "../types/types";
//en el reducer no debe tener ninguna otra funcion por eso no puse el localstorage aca
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                userType: action.payload.userType,
                user: action.payload.user
            }
        case types.logout:
            return {
                logged: false
            }
        default:
            return state;
    }
}