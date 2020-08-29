import {Get_Songs, Get_Song, Remove_Song, Song_Error, Update_Likes, Add_Song_View, Remove_Song_View, Edit_Song, Post_Song, Add_Song_Comment, Remove_Song_Comment, Add_Song_Image} from './types';
import axios from 'axios';
import {setAlert} from './alert';

// get all songs
export const getSongs = () => async dispatch => {
    
    try{
        const res = await axios.get('/api/songs');

        dispatch({type: Get_Songs, payload: res.data})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

// get song by id
export const getSong = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`/api/songs/${id}`);

        dispatch({type: Get_Song, payload: res.data})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
// remove song by id
export const removeSong = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/songs/${id}`);

        dispatch({type: Remove_Song, payload: id});

    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

export const addView = (id) => async dispatch => {
    try{
        const res = await axios.put(`/api/songs/view/${id}`);
        dispatch({type: Add_Song_View, payload: {id, views: res.data}})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }

}
export const removeView = (id, viewId) => async dispatch => {
    try{
        const res = await axios.put(`/api/songs/unview/${id}/${viewId}`);
        dispatch({type: Remove_Song_View, payload: {id, viewId, views: res.data}})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }

}

export const addLike = (id) => async dispatch => {
    
    try{
        const res = await axios.put(`/api/songs/like/${id}`);


        dispatch({type: Update_Likes, payload: {id, likes: res.data}})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        
    }
}
export const removeLike = (id) => async dispatch => {
    
    try{
        const res = await axios.put(`/api/songs/unlike/${id}`);

        dispatch({type: Update_Likes, payload: {id, likes: res.data}})
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const addSong = (formData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try{
        const res = await axios.post('/api/songs', formData, config);

        dispatch({type: Post_Song, payload: res.data});
        dispatch(setAlert('Song added.', 'success'))
    }   
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const addComment = (songId, formData) => async dispatch => {
    
    try{
        const res = await axios.post(`/api/songs/comment/${songId}`, formData);

        dispatch({type: Add_Song_Comment, payload: res.data});
        dispatch(setAlert('Comment added.', 'success'));
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        
    }
}
export const removeComment = (songId, commentId) => async dispatch => {
    try{
        await axios.delete(`/api/songs/comment/${songId}/${commentId}`);
        dispatch({type: Remove_Song_Comment, payload: commentId});
        dispatch(setAlert('Comment Removed', 'success'));
    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const addSongImage = (id, file) => async dispatch => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }
    try{
        const res = await axios.post(`/api/songs/image/${id}`, formData, config)
        dispatch({type: Add_Song_Image, payload: res.data});
        dispatch(setAlert('Song image uploaded', 'success'));

    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const editSong = (id, formData) => async dispatch => {
    

    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await axios.post(`/api/songs/edit/${id}`, formData, config)
        dispatch({type: Edit_Song, payload: res.data});
        dispatch(setAlert('Song uploaded', 'success'));

    }
    catch(err){
        dispatch({type: Song_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
