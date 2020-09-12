import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Profiles from './profiles/Profiles';
//import FrontSongs from './songs/FrontSongs';
//import SongListing from './songs/SongListing';
//import AuthorListing from './songs/AuthorListing';
//import FrontArticles from './posts/FrontArticles';
import AddSong from './songs/AddSong';
import {getAuthors} from './actions/author';
import {getSongs, removeLike, addLike} from './actions/song';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddAuthor from './songs/AddAuthor';
import FrontAdd from './FrontAdd';
import { getQuotes } from './actions/quote';
import ReactHtmlParser from 'react-html-parser';
import AddQuote from './quotes/AddQuote';
import FrontPagination from './FrontPagination';
import FrontPictures from './FrontPictures';
import FrontPicture from './FrontPicture';
import { getProfiles } from './actions/profile';
import FrontNav from './FrontNav';

const FrontPage = ({getAuthors, author:{authors}, getProfiles, getQuotes, getSongs, profile:{profiles}, quote:{quotes}, song:{songs, loading}, auth:{user}, addLike, removeLike}) => {

    useEffect(()=> {
        getAuthors();
        getQuotes()
        getSongs()
        getProfiles()
    }, [getSongs, loading]);

    
    
    const [frontAdd, setFrontAdd] = useState(false);
    const [frontNav, setFrontNav] = useState(false);

    const [frontAuthors, setFrontAuthors] = useState(true);
    const [frontAuthor, setFrontAuthor] = useState(false);
    const [authorContent, setAuthorContent] = useState([]);


    const [quoteView, setQuoteView] = useState(false);
    const [songInputView, setSongInputView] = useState(false);
    const [authorInputView, setAuthorInputView] = useState(false);

    const selection = authors.map(auth=><option value={auth.author} key={auth._id}>{auth.author}</option>)
    
    
    const [currentSlide, setCurrentSlide] = useState(1)
    const quotesForSlides = 10;

    const sliceQuotes = quotes.slice(0, quotesForSlides)

    const slide = sliceQuotes[currentSlide - 1]

    const slideDots = []

    for(let i = 0; i < sliceQuotes.length; i++){
        slideDots.push(i)
    }

    var timerId;
    useEffect(() => {

        if(play){
            
            var current = currentSlide
        
            timerId = setInterval(()=> {
            current++
            
            if(current > sliceQuotes.length){
                current = 1
            }
            setCurrentSlide(current)
    
        }, 3500)
            
        }
        
        return () => clearInterval(timerId);

    }, [sliceQuotes, currentSlide])
    
    const [play, setPlay] = useState(true)
    
    const turnOn = () => {
        setCurrentSlide(currentSlide)
        setPlay(true)
    }
    const turnOff = () => {
        clearInterval(timerId)
        setPlay(false)
    }

    function compareLikes(a, b){
        const valueA = a.likes.length
        const valueB = b.likes.length

        let comparsion = 0;
        if(valueA < valueB){
            comparsion = 1
        }
        else if(valueA > valueB){
            comparsion = -1
        }
        return comparsion
    }
    const mapValues = songs.map(song => (song._id, song))
    const sortSongs = mapValues.sort(compareLikes)


    return (
        <Fragment >
            <div className="shield-personal">
            
                <div className="front-top">
                    <div className="page-title" onClick={e=>setFrontNav(!frontNav)}>HOME</div>
                    {
                        frontNav && <FrontNav frontNav={frontNav} setFrontNav={setFrontNav} />
                    }
                    {
                        user ? <button id="front-addSong-button" onClick={e=>{setFrontAdd(!frontAdd), setFrontNav(false)}} ><img src={require('./style/plus.png')} /></button> : <Link to="/login" id="front-login-button" ><img src={require('./style/log_in.png')} />{ReactHtmlParser('&nbsp')} Log in</Link>
                    }
                    
                    
                {
                    frontAdd && <FrontAdd frontAdd={frontAdd} setFrontAdd={setFrontAdd} songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} quoteView={quoteView} setQuoteView={setQuoteView} />
                }
                {
                    frontAdd && <div className="addshadow" ></div>
                }
                
                {
                    quoteView && <AddQuote quoteView={quoteView} setQuoteView={setQuoteView} frontAdd={frontAdd} setFrontAdd={setFrontAdd} />
                }
                {
                    songInputView && <AddSong songInputView={songInputView} setSongInputView={setSongInputView} authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} />
                }
                {
                    authorInputView && <AddAuthor authorInputView={authorInputView} setAuthorInputView={setAuthorInputView} songInputView={songInputView} setSongInputView={setSongInputView} />
                }
                {
                    quoteView && <div className="addshadow"></div>
                }
                {
                    songInputView && <div className="addshadow"></div>
                }
                {
                    authorInputView && <div className="addshadow"></div>
                }
                </div>
            </div>

                <div className="shield-personal" onClick={e => setFrontNav(false)}>
                

                    <div className="front-content">
                        
                        <div className="front-left-side grid-left-1" style={{"backgroundColor": "#121212"}}>
                            <div className="pop-left-label">
                                <FrontPagination songs={sortSongs} removeLike={removeLike} addLike={addLike} user={user} category="Hot song titles" labelUrl="songs" songsLimitPerPage="7" />
                            </div>
                        </div>
                        <div className="front-right-side grid-right-1" style={{"backgroundColor": "#121212"}}>
                        <div className="pop-left-label" style={{"backgroundColor": "#121212"}}> 
                            <img src={require("./style/92830104_586716501942640_2496364056202444800_n.png")} />
                            </div>
                        </div>
                        <div className="front-left-side grid-left-2" style={{"backgroundColor": "#121212"}}>
                            <div className="pop-left-label">
                                <div className="slider-category">
                                    Top quotes
                                </div>    
                                <div className="front-post-slider">
                                            
                                            <div className="front-slider-text" onClick={e=> play ? turnOff() : turnOn()}>
                                            <img src={require("./style/quote.png")} />
                                            {
                                                quotes.length > 0 && <Fragment>
                                                    
                                                    <div className="slide-content">
                                                    {
                                                        currentSlide == 1 && <img src={require('./style/116582640_601584904065803_3491157785135964929_n.png')} className="currentRank" />
                                                    }
                                                    {
                                                        currentSlide == 2 && <img src={require('./style/116693192_1822518024581950_7044401433487286268_n.png')} className="currentRank" />
                                                    }
                                                    {
                                                        currentSlide == 3 && <img src={require('./style/116551900_724730331652451_9070155732800061649_n.png')} className="currentRank" />
                                                    }
                                                        <Link to={`/quotes/${slide._id}`}> {ReactHtmlParser(slide.content)} </Link>
                                                    </div>
                                                    <div className="slide-author">
                                                    <Link to={`/quotes/${slide._id}`}> – {slide.author}</Link>
                                                    </div>
                                                    <div className="slide-user">
                                                        Added by {ReactHtmlParser("&nbsp")}<Link to={`/profile/${slide.user}`}>{slide.name}</Link>
                                                    </div>
                                                </Fragment>
                                                
                                            }
                                            </div>
                                            <div className="front-slider-dots">
                                            {
                                                slideDots.map(number => number + parseFloat(1) == currentSlide ? <div key={number} className="front-slider-dot" onClick={e=>setCurrentSlide(number + 1)} style={{'color': 'green'}} >⚪</div> : <div key={number} className="front-slider-dot" onClick={e=>setCurrentSlide(number + 1)} >⚪</div>)
                                            }
                                            
                                            </div>
                                            
                                </div>  
                                
                            </div>
                        </div>
                        <div className="front-right-side grid-right-2" style={{"backgroundColor": "#121212"}}>
                        <div className="pop-left-label">
                            <FrontPagination songs={songs} removeLike={removeLike} addLike={addLike} user={user} category="New song titles" labelUrl="songs" songsLimitPerPage="7" />
                            </div>
                        </div>
                        <div className="front-author-side" style={{"backgroundColor": "#252525"}}>
                            <div className="pop-category">
                                {frontAuthors ? "Top Authors" : <Link to={`/authors/${authorContent._id}`}>{authorContent.name}</Link>}
                            </div>
                            
                                {
                                    frontAuthors && <FrontPictures frontAuthors={frontAuthors} setFrontAuthors={setFrontAuthors} frontAuthor={frontAuthor} setFrontAuthor={setFrontAuthor} authorContent={authorContent} setAuthorContent={setAuthorContent} authors={authors} profiles={profiles} labelUrl="authors" authorsLimitPerPage="5" />
                                }
                                {
                                    frontAuthor && <FrontPicture songs={songs} frontAuthors={frontAuthors} setFrontAuthors={setFrontAuthors} frontAuthor={frontAuthor} setFrontAuthor={setFrontAuthor} authorContent={authorContent} setAuthorContent={setAuthorContent} labelUrl="authors" /> 
                                }
                                {
                                    frontAuthor && <div className="add-touch-shadow" onClick={e => {setFrontAuthor(false), setFrontAuthors(true), setAuthorContent([])}}></div>
                                }
                                
                        </div>
                                
                    </div>
                      
            </div>
            
        </Fragment>
    );
}
FrontPage.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    author: state.author,
    quote: state.quote,
    auth: state.auth,
    song: state.song,
    profile: state.profile
})
export default connect(mapStateToProps, {getAuthors, getQuotes, getSongs, getProfiles, addLike, removeLike})(FrontPage);