import {Post_Newsletter, Get_Newsletters, Get_Newsletter, Remove_Newsletter, Newsletter_Error} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const addNewsletter = (formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    try{
        const res = await axios.post('/api/newsletters', formData, config);
    
        dispatch({type: Post_Newsletter, payload: formData});
        dispatch(setAlert('E-mail added.', 'success'));
    }
    catch(err){
        dispatch({type: Newsletter_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const addGuestNewsletter = (formData) => async dispatch => {

    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        await axios.post('/api/newsletter/guest', formData, config);

        dispatch(setAlert('E-mail uploaded', 'success'))
    }
    catch(err){
        dispatch({type: Newsletter_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}




export const getNewsletters = () => async dispatch => {
    try{
        const res = await axios.get('/api/newsletters');
        
        dispatch({type: Get_Newsletters, payload: res.data});
    }
    catch(err){
        dispatch({type: Newsletter_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const getNewsletter = (id) => async dispatch => {
    try{
        const res = await axios.get(`/api/newsletters/${id}`);
        
        dispatch({type: Get_Newsletter, payload: res.data});
    }
    catch(err){
        dispatch({type: Newsletter_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

export const removeNewsletter = (id) => async dispatch => {
    try{
        await axios.delete(`/api/newsletters/${id}`);
        
        dispatch({type: Get_Newsletter, payload: id});
        dispatch(setAlert('E-mail removed.', 'danger'));
    }
    catch(err){
        dispatch({type: Newsletter_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}