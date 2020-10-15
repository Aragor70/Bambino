import { Get_Client, Client_Error, Get_Clients } from "../actions/types";


const initialState = {
    client: '',
    clients: [],
    loading: true,
    errors: {}
}
export default (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case Get_Client:
            return { ...state, client: payload, loading: false }
        case Get_Clients:
            return { ...state, clients: payload, loading: false }
        case Client_Error:
            return { ...state, errors: payload, loading: false }

        default:
            return state;
    }
}