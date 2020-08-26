import React, { Fragment, createElement, useState, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './routing/PrivateRoute';
import Account from './Account';
import Settings from './Settings';
import CreateProfile from './CreateProfile';
import CreateQuote from './CreateQuote';
import CreateRecommendation from './CreateRecommendation';
import Profiles from './profiles/Profiles';
import Profile from './profiles/Profile';
import Song from './songs/Song';
import FrontPage from './FrontPage';

import Logo from './Logo';
import Open from './Open';
import About from './About';
import Newsletter from './Newsletter';
import Menu from './Menu';
import TopNav from './TopNav';
import SongAuthor from './songs/SongAuthor';
import SongPublic from './songs/SongPublic';
import Control from './Control';
import History from './userAccount/History';
import Library from './userAccount/Library';
import AllFavorites from './userAccount/AllFavorites';
import TopList from './TopList';
import Uploaded from './userAccount/Uploaded';
import Quote from './quotes/Quote';
import Album from './songs/Album';

const App = ({isAuthenticated}) => {

    const [menu, setMenu] = useState(false);
    
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({behavior: 'smooth', inline:'center'})
        }
    }, [scrollTo])

    const [filterUser, setFilterUser] = useState({
        name:[],    
        id:[],
        avatar:[]

    });
    const [filterSong, setFilterSong] = useState({
        id:[],
        title:[],
        author:[]

    });
    const [filterAuthor, setFilterAuthor] = useState({
        id:[],
        author:[]

    });

    return(
        <Fragment>
            <Router>
            <header className="header" >
                
                
                <TopNav menu={menu} setMenu={setMenu} filterUser={filterUser} setFilterUser={setFilterUser} filterSong={filterSong} setFilterSong={setFilterSong} filterAuthor={filterAuthor} setFilterAuthor={setFilterAuthor} />
            </header>
                {
                    menu && <Menu menu={menu} setMenu={setMenu} />
                }
            <main className="output" ref={scrollTo} onClick={e=>{setMenu(false), setFilterUser(''), setFilterSong(''), setFilterAuthor('') }}>

                {
                    isAuthenticated ? 
                    <Fragment>
                    <Switch>
                    <PrivateRoute exact path="/profile" component={Account} />
                    <PrivateRoute exact path="/create_profile" component={CreateProfile} />
                    <PrivateRoute exact path="/create_quote" component={CreateQuote} />
                    <PrivateRoute exact path="/create_recommendation" component={CreateRecommendation} />
                    <PrivateRoute exact path="/settings" component={Control} />
                    <Route exact path="/profile/:id" component={Profile} />

                    <Route exact path="/history">
                        
                        <History />
                    </Route>
                    <Route exact path="/my_uploaded">
                        
                        <Uploaded />
                    </Route>

                    
                    <Route exact path="/library">
                        
                        <Library />
                    </Route>
                    <Route exact path={"/library/favorites"}>
                       <AllFavorites />
                    </Route>
                    <Route exact path={"/top_songs"}>
                       <TopList />
                    </Route>

                    <Route exact path="/">
                        
                        <FrontPage />
                    </Route>
                    </Switch>
                    </Fragment> :
                    <Fragment>
                        <Switch>
                            <Route exact path="/">
                                <FrontPage />
                            </Route>
                            <Route exact path="/about" component={About} />
                            <Route exact path="/newsletter" component={Newsletter} />
                        </Switch>
                        
                    </Fragment>
                }
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/authors/:id" component={SongAuthor} />
                <Route exact path="/songs/:id" component={Song} />
                <Route exact path="/quotes/:id" component={Quote} />
                <Route exact path="/authors/:author_id/album/:id" component={Album} />
            </main>
            </Router>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(App);