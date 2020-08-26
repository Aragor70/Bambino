import React, { Fragment, useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {quoteLike, removeQuoteLike, getQuote} from '../actions/quote';
import ReactHtmlParser from 'react-html-parser';

const Quote = ({match, quote:{quote, loading, quotes}, auth:{user}, getQuote, quoteLike, removeQuoteLike}) => {

    
    useEffect(() => {
        getQuote(match.params.id);
    }, [getQuote, quotes]);
    

    return(
        <Fragment>
        <div className="shield">
            <div className="profile-mid">
                <div className="profile-page-title">QUOTE</div>
            </div>
        </div>
        <div className="shield">
        <div className="song-content">
        {
                loading || quote == null ? ("loading...") : <Fragment>
                    
        <div className="song-main">

            <div className="slide-content">
                {ReactHtmlParser(quote.content)}
            </div>
            <div className="slide-author">
            – {quote.author}
            </div>
            <div className="slide-user">
                Added by {quote.name}
            </div>    
                
                {
                    user && <Fragment>
                        <div className="song-buttons">
                        {
                            user && quote && quote.likes.user === user._id ? <button onClick={e=> quoteLike(quote._id)} className="fa fa-thumbs-up song-button"> {quote.likes && quote.likes.length}</button> : <button onClick={e=> quoteLike(quote._id)} className="fa fa-thumbs-up song-button"> {quote.likes && quote.likes.length}</button>
                        }
                        <button onClick={e=> removeQuoteLike(quote._id)} className="fa fa-thumbs-down song-button"></button>
                        </div>
                        <div className="song-buttons">
                        <div className="song-views-button"><Moment format="DD-MM-YYYY">{quote.date}</Moment></div>
                        </div>
                        
                            
                    </Fragment>
                }
                {
                    !user && <Fragment>
                        <div className="song-buttons">
                            <div className="song-views-button"><Moment format="DD-MM-YYYY">{quote.date}</Moment></div>
                        </div>
                    </Fragment>
                }
                    </div>
                    
                
        </Fragment>
        } 
        </div>
        </div>
        </Fragment>
    
    );
}
Quote.propTypes = {
    addComment: PropTypes.func.isRequired,
    removeQuoteLike: PropTypes.func.isRequired,
    quoteLike: PropTypes.func.isRequired,
    getQuote: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    quote: state.quote
})
export default connect(mapStateToProps, { getQuote, quoteLike, removeQuoteLike})(Quote);