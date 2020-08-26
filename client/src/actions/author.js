import axios from 'axios';
import {setAlert} from './alert';
import {Get_Authors, Post_Author, Author_Error, Remove_Author, Get_Author, Add_Album, Edit_Author, Edit_Album, Add_Author_Image, Add_Album_Image, Remove_Album} from './types';

export const getAuthors = () => async dispatch => {
    try{
        const res = await axios.get('/api/authors');
        dispatch({type: Get_Authors, payload: res.data})
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
    }
}

export const getAuthor = (id) => async dispatch => {
    try{
        const res = await axios.get(`/api/authors/${id}`);
        dispatch({type: Get_Author, payload: res.data})
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
    }
}

export const addAuthor = (formData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await axios.post('/api/authors', formData, config);
        
        dispatch({type: Post_Author, payload: res.data});
        dispatch(setAlert('Author added.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
    }
}
export const removeAuthor = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/authors/${id}`);
        dispatch({type: Remove_Author, payload: id});
        dispatch(setAlert('Author removed.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
    }
}
export const addAlbum = (author_id, formData) => async dispatch => {
    
    try{

        const res = await axios.post(`/api/authors/album/${author_id}`, formData);
        

        dispatch({type: Add_Album, payload: res.data});
        dispatch(setAlert('Collection added.'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Collection error.'));
    }
}

export const addAuthorImage = (author_id, file) => async dispatch => {
    const formData = new FormData;
    formData.append('file', file)

    const config = {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }
    try{

        const res = await axios.post(`/api/authors/image/${author_id}`, formData, config);
        

        dispatch({type: Add_Author_Image, payload: res.data});
        dispatch(setAlert('Image added.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Image error.', 'danger'));
    }
}
export const editAuthor = (author_id, formData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{

        const res = await axios.post(`/api/authors/edit/${author_id}`, formData, config);
        
        dispatch({type: Edit_Author, payload: res.data});
        dispatch(setAlert('Edit added.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload:{ msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Edit error.', 'danger'));
    }
}

export const addAlbumImage = (author_id, album_id, file) => async dispatch => {
    const formData = new FormData();
    formData.append('file', file)

    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    try{
        const res = await axios.post(`/api/authors/albumImage/${author_id}/${album_id}`, formData, config);

        dispatch({type: Add_Album_Image, payload: res.data});
        setAlert('Image added.', 'success')
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }});
    }
}

export const editAlbum = (authorId, album_id, formData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await axios.post(`/api/authors/albumEdit/${authorId}/${album_id}`, formData, config);
        dispatch({type: Edit_Album, payload: res.data})
        dispatch(setAlert('Edit added.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Edit error.', 'danger'));
    }
}

export const removeAlbum = (authorId, album_id) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await axios.post(`/api/authors/albumRemove/${authorId}/${album_id}`, config);
        dispatch({type: Remove_Album, payload: res.data});
        dispatch(setAlert('Album removed.', 'success'));
    }
    catch(err){
        dispatch({type: Author_Error, payload: { msg: err.response.statusText, status: err.response.status }})
        dispatch(setAlert('Remove error.', 'danger'));
    }
}