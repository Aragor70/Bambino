import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import song from './song';
import author from './author';
import newsletter from './newsletter';
import quote from './quote';
import chat from './chat';
import client from './client'

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    song,
    author,
    newsletter,
    quote,
    chat,
    client
});