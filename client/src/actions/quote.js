
import axios from 'axios';
import { Add_Quote, Quote_Error, Get_Quotes, Get_Quote, Update_Quote } from './types';



export const addQuote = formData => async dispatch => {
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try{
        const res = await axios.post('/api/quotes', formData, config);
        dispatch({type: Add_Quote, payload: res.data})
    }
    catch(err){
        dispatch({type: Quote_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const getQuotes = () => async dispatch => {
    
    try{
        const res = await axios.get('/api/quotes');
        dispatch({type: Get_Quotes, payload: res.data})
    }
    catch(err){
        dispatch({type: Quote_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const getQuote = id => async dispatch => {
    
    try{
        const res = await axios.get(`/api/quotes/${id}`);
        dispatch({type: Get_Quote, payload: res.data})
    }
    catch(err){
        dispatch({type: Quote_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

export const quoteLike = id => async dispatch => {
    
    try{
        const res = await axios.put(`/api/quotes/like/${id}`);
        dispatch({type: Update_Quote, payload: {id, likes: res.data}})
    }
    catch(err){
        dispatch({type: Quote_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

export const removeQuoteLike = id => async dispatch => {
    
    try{
        const res = await axios.put(`/api/quotes/unlike/${id}`);
        dispatch({type: Update_Quote, payload: {id, likes: res.data}})
    }
    catch(err){
        dispatch({type: Quote_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}