import axios from 'axios'
import { Get_Messages, Get_Notifies, Get_User_Chat, Notify_Error, Notify_Removed, Update_Notifies, Update_Message, Update_Notification, Notfy_Removed_All } from './types'


export const getMessages = () => async dispatch => {
    try {
        const res = await axios.get('/api/chat/received')

        dispatch({ type: Get_Messages, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}

export const getSentMessages = (x) => async dispatch => {
    try {
        const res = await axios.get(`/api/chat/sent/${x}`)

        dispatch({ type: Get_Messages, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}
export const getReceivedMessages = (x) => async dispatch => {
    try {
        const res = await axios.get(`/api/chat/received/${x}`)

        dispatch({ type: Get_Messages, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}

export const getNotifies = () => async dispatch => {
    try {
        const res = await axios.get('/api/chat/notifications')

        dispatch({ type: Get_Notifies, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}

export const getUserChat = (id, number) => async dispatch => {
    try {
        const res = await axios.get(`/api/chat/${id}/${number}`)

        dispatch({ type: Get_User_Chat, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}
export const removeNotify = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/chat/notifications/${id}`)

        dispatch({ type: Notify_Removed, payload: {id, notifies: res.data} })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}
export const removeNotifies = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/chat/notifications`)

        dispatch({ type: Notfy_Removed_All, payload: res.data })
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}

export const openNotifies = () => async dispatch => {
    try {
        const res = await axios.put('/api/chat/notifications/open')
        dispatch({ type: Update_Notifies , payload: res.data})
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}

export const seeMessage = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/chat/messages/see/${id}`)
        dispatch({ type: Update_Message , payload: {id, message: res.data}})
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}
export const seeNotify = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/chat/notifications/see/${id}`)
        dispatch({ type: Update_Notification , payload: {id, message: res.data}})
    } catch (err) {
        dispatch({type: Notify_Error, payload: {msg: err.response.statusText, status: err.response.status }})
        
    }
}
