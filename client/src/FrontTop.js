import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import FrontAdd from './FrontAdd';
import AddQuote from './quotes/AddQuote';
import AddSong from './songs/AddSong';
import AddAuthor from './songs/AddAuthor';
import FrontNav from './FrontNav';


const FrontTop = ({ frontNav, setFrontNav, frontAdd, setFrontAdd, user, quoteView, setQuoteView, songInputView, setSongInputView, authorInputView, setAuthorInputView, frontNavValue, setFrontNavValue, setNotify }) => {


    return (
        <div className="shield-personal" onClick={e=> setNotify(false)}>
            
                <div className="front-top">
                    <div className="page-title" onClick={e=>setFrontNav(!frontNav)}>{frontNavValue}</div>
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
    )
}
export default FrontTop;