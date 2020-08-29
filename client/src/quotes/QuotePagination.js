import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

const QuotePagination = ({user, quotes, label, labelUrl, quotesLimitPerPage }) => {


    const [currentQuotes, setCurrentQuotes] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [quotesPerPage, setQuotesPerPage] = useState(quotesLimitPerPage);
    

    useEffect(() => {
        const fetchQuotes = () => {
            setCurrentQuotes(quotes.filter(quote => quote.user == user._id ? (quote._id, quote) : null));

        }
        fetchQuotes();
    }, [quotes]);
    const indexOfLastQuote = currentPage * quotesPerPage;
    const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
    const selectedQuotes = currentQuotes.slice(indexOfFirstQuote, indexOfLastQuote);


    const totalQuotes = currentQuotes.length;
    const lastPageNumber = Math.ceil(totalQuotes / quotesPerPage);

    const pageNumbers = []

    for(let i = 1; i <= lastPageNumber; i++){
        pageNumbers.push(i)
    }
    let profileQuotes = quotes.filter(quote => quote.user == user._id);
    
    return (
        <Fragment>
        
        {
            quotes == null ? <div className="quotes-label">loading...</div> : <div className="quotes-label">
            {selectedQuotes.map(quote => quote.user == user._id && <Fragment key={quote._id}>
                
                <div className="quotes-info" key={quote._id}>
                <img src={require("../style/quote.png")} />
                <div className="quotes-content">
                <Link to={`/profile/${user._id}/${labelUrl}/${quote._id}`}>{ReactHtmlParser(quote.content)}</Link>
                </div>
                <div className="quotes-author">
                <Link to={`/profile/${user._id}/${labelUrl}/${quote._id}`}>– {quote.author}</Link>
                </div>
                <div className="quotes-user">
                    Added {moment(quote.date).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                </div>
                
            </Fragment>)}
            {
                quotes && pageNumbers.length > 0 && <Fragment>
                    <div className="pageNumbers">
                    {
                    pageNumbers.map(number=><div className="pageNumber" onClick={e=>setCurrentPage(number )}> {number} </div>)
                    }
                </div>
                </Fragment>
            }
            
            </div>
        }
        
        </Fragment>
    );
}
export default QuotePagination;