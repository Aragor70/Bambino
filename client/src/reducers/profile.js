import { Get_Profile, Get_Profiles, Get_Repos, Profile_Error, Clear_Profile, Update_Profile, Add_Author_Subscribe, Add_File, Get_Views, Add_Picture, Github_Error } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error:{},
    views: []
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case Get_Profile:
            return {...state, profile: payload, loading: false}
        case Get_Profiles:
            return {...state, profiles: payload, loading: false}
        case Get_Repos:
            return {...state, repos: payload, loading: false}
        case Get_Views:
            return {...state, views: payload, loading: false}
        case Update_Profile:
            return {...state, profile: payload, loading: false}
        case Clear_Profile:
            return {...state, profile: null, repos: [], loading: false};
        case Github_Error:
            return {...state, repos:[], loading: false}
        case Profile_Error:
            return {...state, error: payload, loading: false, profile: null}
        case Add_Author_Subscribe:
            return {...state, profile: {...state.profile, subscribes: payload}, loading: false}
        case Add_File:
            return {...state, profile: {...state.profile, myfile: payload}, loading: false}
        case Add_Picture:
            return {...state, profile: {...state.profile, pictures: payload}, loading: false}

        default:
        return state;
    }
}