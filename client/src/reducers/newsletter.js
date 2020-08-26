import { Post_Newsletter, Get_Newsletters, Get_Newsletter, Newsletter_Error } from "../actions/types";


const initialState = {
    newsletters:[],
    newsletter:null,
    loading: true,
    errors:{}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case Post_Newsletter:
            return {...state, newsletter:payload, loading: false}
        case Get_Newsletters:
            return {...state, newsletters: payload, loading: false}
        case Get_Newsletter:
            return {...state, newsletter: payload, loading:false}
        case Newsletter_Error:
            return {...state, errors: payload, loading: false}

            default:
                return state;
    }
}