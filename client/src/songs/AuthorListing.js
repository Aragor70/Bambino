import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthors} from '../actions/author';
import {Moment} from 'react-moment';
import {Link} from 'react-router-dom';

const AuthorListing = ({ getAuthors, author: {authors, loading} }) => {

    useEffect(()=> {
        getAuthors()
    }, []);

    return (
        <Fragment>
            <div className="song-front-list">
            <div className="song-info-content">
            <div className="front-heading">Authors</div>
            </div>
            <div className="song-list-content">
                {
                    authors == null || loading ? "loading..." : 
                    authors.map(auth=> <div className="song-front-info" key={auth._id}><Link to={`/authors/${auth._id}`}>{auth.author}</Link></div>)  
                }
                
            </div>
            </div>

        </Fragment>
    );
}
AuthorListing.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    author: state.author
})
//export default connect(mapStateToProps, {getAuthors})(AuthorListing);