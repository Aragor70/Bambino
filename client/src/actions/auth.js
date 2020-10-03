import axios from 'axios';
import {Register_Success, Register_Fail, User_Loaded, Auth_Error, Login_Success, Login_Fail, Logout, Clear_Profile, User_Error, Update_User, Add_Avatar, Two_Factor} from './types';

import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load the user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    try{
        const res = await axios.get('/api/auth');
        dispatch({type: User_Loaded, payload: res.data});
    }
    catch(err){
        dispatch({type: Auth_Error});
    }

}


// Registration user
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    try{
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: Register_Success,
            payload: res.data
        });
        dispatch(loadUser());
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: Register_Fail
        });
    }

} 


// Login user
export const login = (email, password, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    try{
        const res = await axios.post('/api/auth', body, config);

        if (res.data.user) {
            
            dispatch({
                type: Two_Factor,
                payload: res.data
            })
            history.push(`/two_factor/${res.data.user}`)
            return dispatch(setAlert('Email sent.', 'success'))

        } 

            await dispatch({
                type: Login_Success,
                payload: res.data
            })

            dispatch(loadUser());
            history.push('/')
        
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: Login_Fail
        });
    }

}; 

// Logout
export const logout = () => dispatch => {
    dispatch({type: Clear_Profile});
    dispatch({type: Logout});
    
}

// Change user data
export const updateUser = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/users/${id}`, formData, config);

        dispatch({type: Update_User, payload: res.data });
        dispatch(setAlert('User updated.', 'success'));
    }
    catch(err){
        dispatch({type: User_Error, payload: {msg: err.response.statusText, status: err.response.status }})
    }
    
}

// change avatar
export const addAvatar = (file) => async dispatch => {
        
    const formData = new FormData();
    formData.append('file', file);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            const res = await axios.post('/api/profile/avatar', formData, config);
           
            
        
            dispatch({type: Add_Avatar, payload: res.data})
            dispatch(setAlert('User updated.', 'success'));
        }
        catch(err){
            console.log('Server error.');
            dispatch({type: User_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        }
}

// change password
export const editPassword = (formData, id) => async dispatch => {
        
    
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        try{
            const res = await axios.post(`/api/users/password/${id}`, formData, config);
           
        
            dispatch({type: Update_User, payload: res.data})
            dispatch(setAlert('User updated.', 'success'));
        }
        catch(err){
            console.log('Server error.');
            dispatch({type: User_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        }
}

//forgot user password, send the email
export const forgotPassword = (formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        await axios.post(`/api/auth/forgotpassword`, formData, config);
        dispatch(setAlert('Email sent.', 'success'))
    }
    catch(err){
        console.log('Server error.');
        dispatch(setAlert('Email cound not be sent.', 'danger'))
    }
}
export const resetPassword = (resettoken, formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        await axios.put(`/api/auth/resetpassword/${resettoken}`, formData, config);
        setAlert('Password changed.', 'success')


        // ${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}
    }
    catch(err){
        console.log('Server error.');
        setAlert('Password cound not be changed.', 'danger')
    } 
}

// switch two factor auth

export const turnFactors = () => async dispatch => {
    try {
        const res = await axios.post('/api/auth/two_factor');
        dispatch({type: Update_User, payload: res.data})
        dispatch(setAlert('Authorization changed.', 'success'))

    } catch (err) {
        dispatch({type: User_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Authorization error.', 'danger'))
    }

}
export const checkLogin = (formData, id, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/auth/two_factor/${id}`, formData, config);
        
        
        
        await dispatch({type: Login_Success, payload: res.data})
        
        dispatch(loadUser());

        return history.push('/')

    } catch (err) {
        dispatch({type: User_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Invalid credentials.', 'danger'))
    }
}