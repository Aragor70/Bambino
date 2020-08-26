import { Get_Posts, Get_Post, Post_Error, Update_Likes, Remove_Post, Add_Post, Add_Post_Comment, Remove_Post_Comment, Add_Post_View } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}
export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case Get_Posts:
            return {...state, posts: payload, loading: false}
        case Get_Post:
            return {...state, post: payload, loading: false}
        case Remove_Post:
            return {...state, posts: state.posts.filter(post=> post._id !== payload), loading: false}
        case Post_Error:
            return {...state, error: payload, loading: false}
        case Update_Likes:
            return {...state, posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes} : post), loading: false }
        case Add_Post:
            return {...state, posts: [...state.post, payload], loading: false}
        case Add_Post_View:
            return {...state, posts: state.posts.map(post=> post._id == payload.id ? {...post, views: payload.views} : post ), loading: false }
        case Add_Post_Comment:
            return {...state, post: {...state.post, comments: payload}, loading: false}
        case Remove_Post_Comment:
            return {...state, post: {...state.post, comments: state.post.comments.filter(comment => comment._id !== payload)}, loading: false}

        default:
            return state;
    }
}
