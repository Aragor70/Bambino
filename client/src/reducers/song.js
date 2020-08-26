import {Get_Songs, Get_Song, Remove_Song, Song_Error, Update_Likes, Add_Song_View, Remove_Song_View, Edit_Song, Post_Song, Add_Song_Comment, Remove_Song_Comment, Post_Song_Image, Add_Song_Image} from '../actions/types';

const initialState = {
    songs: [],
    song: null,
    loading: true,
    errors: {}
}
export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case Get_Songs:
            return {...state, songs: payload, loading: false}
        case Get_Song:
            return {...state, song: payload, loading: false}
        case Remove_Song:
            return {...state, songs: state.songs.filter(song=>song._id !== payload), loading: false}
        case Song_Error:
            return {...state, errors: payload, loading: false}
        case Update_Likes:
            return {...state, songs: state.songs.map(song => song._id == payload.id ? {...song, likes: payload.likes} : song ), loading: false}
        case Add_Song_View:
            return {...state, songs: state.songs.map(song=> song._id == payload.id ? {...song, views: payload.views} : song ), loading: false }
        case Remove_Song_View:
            return {...state, songs: state.songs.map(song=> song._id == payload.id ? {...song, views: payload.views} : song ), loading: false }
        case Post_Song:
            return {...state, songs: [...state.songs, payload] , loading: false}
        case Post_Song_Image:
            return {...state, profile: {...state.profile, myfile: payload}, loading: false}
        case Add_Song_Image:
            return {...state, profile: {...state.profile, images: payload}, loading: false}
        case Add_Song_Comment:
            return {...state, song: {...state.song, comments: payload}, loading: false}
        case Remove_Song_Comment:
            return {...state, song: {...state.song, comments: state.song.comments.filter(comment => comment._id !== payload)}, loading: false}
        case Edit_Song:
            return {...state, song: payload, loading: false}

        default:
            return state;
    }
}