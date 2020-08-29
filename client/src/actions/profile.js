import axios from 'axios';
import {Get_Profile, Get_Repos, Get_Profiles, Get_Views, Profile_Error, Update_Profile, Account_Deleted, Clear_Profile, Add_Author_Subscribe, Add_File, Add_Picture, Github_Error} from './types';
import {setAlert} from './alert';

export const getCurrentProfile = () => async dispatch => {

    try{
        const res = await axios.get('/api/profile/me');
        dispatch({type: Get_Profile, payload: res.data})
    }
    catch(err){
        dispatch({type: Clear_Profile});
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}
// Get all the profiles
export const getProfiles = () => async dispatch => {
    
    try{
        const res = await axios.get('/api/profile');
        dispatch({type: Get_Profiles, payload: res.data});

    }
    catch(err){
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}
// Get profile by Id
export const getProfileById = (userId) => async dispatch => {

    try{
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({type: Get_Profile, payload: res.data});
    }
    catch(err){
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}
// Get github ripos
export const getGithubRepos = (username) => async dispatch => {

    try{
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({type: Get_Repos, payload: res.data});
    }
    catch(err){
        dispatch({type: Github_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

// Create or update user profile
export const createProfile = (formData, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
            "Content-Type": "application/json"
            }
        }
        const res = await axios.post('/api/profile', formData, config);

        dispatch({type: Get_Profile, payload: res.data})
        if(edit){
            dispatch(setAlert('Profile updated.', 'success'));
        }
        else{
            dispatch(setAlert('Profile created.', 'success'));
        }
        

    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

export const addSubscribe = (id) => async dispatch => {
    try{
        const res = await axios.put(`/api/profile/subscribe/${id}`);
        dispatch({type: Add_Author_Subscribe, payload: res.data});
        dispatch(setAlert('Subscribed successful.', 'success'));
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}
export const getSubscribes = (id) => async dispatch => {
    try{
        const res = await axios.get(`/api/profile/subscribe/${id}`);
    }
    catch(err){
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

// Add quote to profile
export const createQuote = (formData, history) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        const res = await axios.put('/api/profile/quote', formData, config);
        dispatch({type: Update_Profile, payload: res.data});
        dispatch(setAlert('Quote uploaded.', 'success'));

        history.push('./account');
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}
// Add recommendation
export const createRecommendation = (formData, history) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }

        const res = await axios.put('/api/profile/recommendation', formData, config);
        dispatch({type: Update_Profile, payload: res.data});
        dispatch(setAlert(`${formData.location} added.`, 'success'));

        history.push('./account');

    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

// Delete recommendation
export const deleteRecommendation = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/recommendation/${id}`);

        dispatch({type: Update_Profile, payload: res.data});
        dispatch(setAlert('Post removed.', 'success'))
    }
    catch(err){
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

// Delete quote
export const deleteQuote = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/quote/${id}`);
        dispatch({type: Update_Profile, payload: res.data});
        dispatch(setAlert('Quote removed.', 'success'))
    }
    catch(err){
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

// Delete account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure to delete your account?')){
        try{
            const res = await axios.delete('/api/profile');
            dispatch({type: Clear_Profile, payload: res.data});
            dispatch({type: Account_Deleted, payload: res.data});
            dispatch(setAlert('Your account removed.', 'success'))
        }
        catch(err){
            dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status} });
        }
    }
}

// add file to myfile
export const addFile = (file) => async dispatch => {
        
    const formData = new FormData();
    formData.append('file', file);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            const res = await axios.post('/api/profile/upload', formData, config);
           
            
        
            dispatch({type: Add_File, payload: res.data})
        }
        catch(err){
            console.log('Server error.');
            dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        }
}

// get songs views
export const getViews = () => async dispatch => {
        try{
            const res = await axios.get('/api/profile/song_history');
           
            
        
            dispatch({type: Get_Views, payload: res.data})
        }
        catch(err){
            console.log('Server error.');
            dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        }
}
// get songs views
export const addPicture = (file) => async dispatch => {
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    try{
        const res = await axios.post('/api/profile/pictures', formData, config)
       
        
    
        dispatch({type: Add_Picture, payload: res.data})
    }
    catch(err){
        console.log('Server error.');
        dispatch({type: Profile_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}