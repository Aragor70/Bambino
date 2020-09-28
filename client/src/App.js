// eslint-disable-next-line
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
import Quote from './quotes/Quote';
import Album from './songs/Album';
import { getCurrentProfile, getProfiles } from './actions/profile';
import FrontSubscribes from './FrontSubscribes';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Alert from './Alert';
import Games from './games/Games';
import Balloons from './games/Balloons';
import Footer from './Footer';
import Support from './support/Support';
import MainSongs from './songs/MainSongs';
import FrontTop from './FrontTop';
import Counting from './games/Counter/Counting';
import Core from './games/Counter/Core';


const App = ({isAuthenticated, user, profile:{profile, loading}, getCurrentProfile}) => {

    useEffect(()=> {
        getCurrentProfile()
    }, [isAuthenticated, user, loading, getCurrentProfile]);
    
    const [list, setList] = useState(false)

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

    const [frontAdd, setFrontAdd] = useState(false);
    const [frontNav, setFrontNav] = useState(false);
    const [frontNavValue, setFrontNavValue] = useState("HOME")

    const [quoteView, setQuoteView] = useState(false);
    const [songInputView, setSongInputView] = useState(false);
    const [authorInputView, setAuthorInputView] = useState(false);

    return(
        <Fragment>
            <Router>
            <header className="header" >
                
                <TopNav menu={menu} setMenu={setMenu} filterUser={filterUser} setFilterUser={setFilterUser} filterSong={filterSong} setFilterSong={setFilterSong} filterAuthor={filterAuthor} setFilterAuthor={setFilterAuthor} />
            </header>
                {
                    menu && <Menu menu={menu} setMenu={setMenu} setList={setList} />
                }
                {
                    user && profile && !list && <div className="hidden-list" onClick={e => setList(!list)}></div>
                }
                {
                    user && loading ? null : profile == null ? null : list && <Fragment>
                        <div className="left-side-list">
                            <div className="front-list-category">SUBSCRIBTIONS</div>
                            {
                                <FrontSubscribes profile={profile} setList={setList} />
                            }
                            <div className="border-list" onClick={e => setList(false)}></div>
                        </div>
                    </Fragment>
                }
            <main className="output" ref={scrollTo} onClick={e=>{setMenu(false), setFilterUser(''), setFilterSong(''), setFilterAuthor(''), setList(false) }}>
                <Alert />
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
                        <FrontTop frontNavValue="HOME" frontNav={frontNav} setFrontNav={setFrontNav} frontAdd={frontAdd} setFrontAdd={setFrontAdd} user={user} quoteView={quoteView} setQuoteView={setQuoteView} songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} />
        
                        <FrontPage setFrontNav={setFrontNav} />

                    </Route>
                    </Switch>
                    

                    </Fragment> :
                    <Fragment>
                        <Switch>
                            <Route exact path="/">
                                
                                <FrontTop frontNavValue="HOME" frontNav={frontNav} setFrontNav={setFrontNav} frontAdd={frontAdd} setFrontAdd={setFrontAdd} user={user} quoteView={quoteView} setQuoteView={setQuoteView} songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} />
                                
                                <FrontPage setFrontNav={setFrontNav} />
                                
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
                <Route exact path="/resetpassword/:resettoken">
                    <ResetPassword />
                </Route>
                <Route exact path="/forgotpassword/">
                    <ForgotPassword />
                </Route>
                <Route exact path="/games">
                    <FrontTop frontNavValue="GAME ZONE" frontNav={frontNav} setFrontNav={setFrontNav} frontAdd={frontAdd} setFrontAdd={setFrontAdd} user={user} quoteView={quoteView} setQuoteView={setQuoteView} songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} />
                    <Games />
                </Route>
                <Route exact path="/games/balloons">
                    <Balloons />
                </Route>
                <Route exact path="/games/counting">
                    <Core />
                </Route>

                <Route exact path="/support">
                    <Support />
                </Route>
                <Route exact path="/songs">
                    <FrontTop frontNavValue="NEW TITLES" frontNav={frontNav} setFrontNav={setFrontNav} frontAdd={frontAdd} setFrontAdd={setFrontAdd} user={user} quoteView={quoteView} setQuoteView={setQuoteView} songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} />
        
                    <MainSongs user={user} />
                </Route>
            </main>
            <footer className="footer">
                <Footer user={user} />
            </footer>
            </Router>
        </Fragment>
    );
}
App.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(App);