import {Get_Authors, Author_Error, Remove_Author, Get_Author, Post_Author, Add_Album, Add_Author_Image, Edit_Author, Add_Album_Image, Edit_Album, Remove_Album} from '../actions/types';


const initialState = {
    authors: [],
    author: null,
    loading: true,
    errors: {}
}
export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case Get_Authors:
            return {...state, authors: payload, loading: false}
        case Author_Error:
            return {...state, errors: payload, loading: false}
        case Remove_Author:
            return {...state, authors: state.authors.filter(auth=>auth.author !== payload), loading: false}
        case Get_Author:
            return {...state, author: payload, loading: false}
        case Post_Author:
            return {...state, authors: [...state.author, payload], loading: false}
        case Add_Album:
            return {...state, author: {...state.author, albums: payload}, loading: false}
        case Add_Album_Image:
            return {...state, author: {...state.author, albums: payload}, loading: false}  
        case Add_Author_Image:
            return {...state, author: {...state.author, images: payload}, loading: false}   
        case Edit_Author:
            return {...state, author: payload, loading: false}    
        case Edit_Album:
            return {...state, author: {...state.author, albums: payload}, loading: false}    
        case Remove_Album:
            return {...state, author: {...state.author, albums: payload}, loading: false}   
        default:
            return state;
    }
}