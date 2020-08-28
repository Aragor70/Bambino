import {Register_Success, Register_Fail, User_Loaded, Auth_Error, Login_Success, Login_Fail, Logout, Account_Deleted, User_Error, Update_User, Add_Avatar} from '../actions/types';

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: {}
}

export default function(state= initialState, action) {
    const { type, payload} = action;
    switch(type) {
        case Register_Success:
            localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case Register_Fail:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated:false, loading: false}
        case User_Loaded:
            return {...state, isAuthenticated: true, loading: false, user: payload}
        case Auth_Error:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated:false, loading: false}
        case Login_Success:
            localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case Login_Fail:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated:false, loading: false}
        case Logout:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated:false, user: null, loading: false}
        case Account_Deleted:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated:false, user: null, loading: false}
        case Update_User:
            return {...state, user: payload, isAuthenticated: true, loading: false}
        case Add_Avatar:
            return {...state, user: payload, isAuthenticated: true, loading: false}
        case User_Error:
            return {...state, errors: payload, isAuthenticated: true, loading: false}

            default:
            return state;
    }
}