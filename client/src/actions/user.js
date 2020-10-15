import axios from 'axios';
import { Get_Client, Client_Error, Get_Clients } from './types';


export const getClientUser = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/users/${id}`);

        dispatch({type: Get_Client, payload: res.data})
    } catch (err) {
        dispatch({type: Client_Error, payload: {errors: { msg: err.response.statusText, status: err.response.status }}})
    }
    
}
export const getClients = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');

        dispatch({type: Get_Clients, payload: res.data})
    } catch (err) {
        dispatch({type: Client_Error, payload: {errors: { msg: err.response.statusText, status: err.response.status }}})
    }
    
}