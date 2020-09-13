import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import './style/headerGrid.css';
import './style/menu.css';
import './style/frontGrid.css';
import './style/settingsGrid.css';
import './style/authGrid.css';
import './style/songGrid.css';
import './style/postGrid.css';
import './style/profileAbout.css';
import './style/historyGrid.css';
import './style/libraryGrid.css';
import './style/songAuthor.css';
import './style/frontAdd.css';
import './style/topList.css';
import './style/profilePictures.css';
import './style/profileAdd.css';
import './style/quoteGrid.css';
import './style/pictureProjects.css';
import './style/albumGrid.css';
import './style/gamesGrid.css';
import './style/footerGrid.css';

import './style/profileTop.css';
import './style/profileMain.css';



import './style/style.css';
import './style/settings.css';
import './style/output.css';
import './style/account.css';
import './style/add.css';
import './style/front.css';



import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
    setAuthToken(localStorage.token)
}

const Wrapper = () =>{

    useEffect(()=> {
        store.dispatch(loadUser());
    }, []);

    return(
        <>
            <Provider store={store}>
                <App />
            </Provider>
        </>   
    );
}

ReactDOM.render(<Wrapper />, document.getElementById("zone"));