import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {getQuotes} from '../actions/quote';
import Moment from 'react-moment';
import QuotePagination from './QuotePagination';


const Quotes = ({profile:{ user, _id }, getQuotes, quote: {quotes, loading} }) => {

    useEffect(() => {
        getQuotes()
    }, []);

    return (
        <Fragment>
            <div className="songs-content">

            <QuotePagination user={user} quotes={quotes} label="Quotes" labelUrl="quotes" quotesLimitPerPage="10" />
            
            </div>
        
        </Fragment>
    );
}
Quotes.propTypes = {
    getQuotes: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quote: state.quote
})
export default connect(mapStateToProps, {getQuotes})(Quotes)