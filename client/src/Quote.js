import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteQuote} from './actions/profile';

const Quote = ({auth: {user} ,profile: {profile}, deleteQuote, hiddenQuote, showQuote}) => {

    const handleDelete = (id) => {
        deleteQuote(id);
    }

    const quotes = profile.quote.map(q => {
        return(
                <Fragment>
                    <div className="view" key={q._id}><p><b>title:</b> {q.title} </p><p> <b>author:</b> {q.author}</p> <p><b>From:</b> {q.location}</p> <p>{q.content}</p> 
                    <button onClick={()=>handleDelete(q._id)} className="delete-button">X</button>    
                    </div>    
                </Fragment>
        )
        });

    return(
        <Fragment>
            {
                hiddenQuote && <Fragment>
                {
                    quotes && <Fragment>
                    <div className="profile-features" >
                        quotes:
                        {quotes.length>0 ? quotes : <p>No quotes on the list.</p>}
                    </div>
                    </Fragment>
                }
                </Fragment>
            }
        </Fragment>
    )
}
Quote.propTypes = {
    deleteQuote: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {deleteQuote})(Quote);