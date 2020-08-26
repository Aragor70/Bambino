import {v4 as uuidv4} from 'uuid';
import {Set_Alert, Remove_Alert} from './types';

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();

    dispatch({type: Set_Alert, payload: {msg, alertType, id}});

    setTimeout(()=>dispatch({type: Remove_Alert, payload: id}), 5000);
}