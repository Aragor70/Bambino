import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteRecommendation} from './actions/profile';

const Recommendation = ({auth: {user}, profile: {profile}, deleteRecommendation, hiddenRecomm, showRecomm}) => {

    const handleDelete = (id) => {
        deleteRecommendation(id);
    }

    const books = profile.recommendation.map(book => {
        return(
            
                book.location == "Book" && <Fragment>
                
                    <div className="view" key={book._id}>{book.title}, {book.content}, {book.author}</div>
                    <button onClick={()=>handleDelete(book._id)} className="delete-button">X</button>
                    
                    
                </Fragment>
        )
    });
    const movies = profile.recommendation.map(movie => {
        return(
            
            movie.location == "Movie" && <Fragment>
                
                    <div className="view" key={movie._id}>{movie.title}, {movie.content}, {movie.author}</div>
                    <button onClick={()=>handleDelete(movie._id)} className="delete-button">X</button>
                    
                
                </Fragment>
        )
    });

    return(
        <Fragment>

            {
                hiddenRecomm && <Fragment>
                    <div className="profile-features">
                { 
                        books && <Fragment>
                            <div className="profile-feature" >
                            books:
                            {books.length>0 ? books : <p>No books on the list.</p>}
                            </div>
                        </Fragment>
                }
                {
                    movies && <Fragment>
                        <div className="profile-feature" >
                        movies:
                        {movies.length>0 ? movies : <p>No movies on the list.</p>}
                        </div>
                    </Fragment>
                }
                    </div>
            </Fragment>
            }
        </Fragment>
    )
}
Recommendation.propTypes = {
    deleteRecommendation: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {deleteRecommendation})(Recommendation);