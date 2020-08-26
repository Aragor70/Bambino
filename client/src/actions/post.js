import axios from 'axios'
import {Get_Posts, Get_Post, Post_Error, Update_Likes, Remove_Post, Add_Post, Add_Post_Comment, Remove_Post_Comment, Add_Post_View} from './types';
import {setAlert} from './alert';

// Get posts
export const getPosts = () => async dispatch => {
    
    try{
        const res = await axios.get('/api/posts');

        dispatch({type: Get_Posts, payload: res.data});
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status }})
    }
}
// Get post by id
export const getPost = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({type: Get_Post, payload: res.data});
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status }});
    }
}


// Remove post by id
export const removePost = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({type: Remove_Post, payload: id});
        dispatch(setAlert('Post removed.', 'success'))
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}

// Add like
export const addLike = (id) => async dispatch => {
    
    try{
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({type: Update_Likes, payload: {id, likes: res.data}});
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status }})
    }
}
// Remove like
export const removeLike = (id) => async dispatch => {
    
    try{
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({type: Update_Likes, payload: {id, likes: res.data}});
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status }})
    }
}
// Post the post
export const addPost = (formData) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try{
        await axios.post('/api/posts', formData, config);

        dispatch({type: Add_Post, payload: formData});
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.message.statusText, status: err.response.status }})
    }
}
export const addComment = (postId, formData) => async dispatch => {
    
    try{
        const res = await axios.post(`/api/posts/comment/${postId}`, formData);

        dispatch({type: Add_Post_Comment, payload: res.data});
        dispatch(setAlert('Comment added.', 'success'));
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status}})
        
    }
}
export const removeComment = (postId, commentId) => async dispatch => {
    try{
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({type: Remove_Post_Comment, payload: commentId});
        dispatch(setAlert('Comment Removed', 'success'));
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }
}
export const addView = (id) => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/view/${id}`);
        dispatch({type: Add_Post_View, payload: {id, views: res.data}})
    }
    catch(err){
        dispatch({type: Post_Error, payload: {msg: err.response.statusText, status: err.response.status}})
    }

}