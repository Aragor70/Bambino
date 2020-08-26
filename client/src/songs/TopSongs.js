import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {getSongs, removeLike, addLike} from '../actions/song';
import Moment from 'react-moment';


const TopSongs = ({getSongs, song: {songs, loading}, removeLike, addLike, auth:{user} }) => {

    useEffect(() => {
        getSongs()
    }, []);

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

    const titlesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const total = sortSongs.length;

    const lastIndex = currentPage * titlesPerPage;
    const firstIndex = lastIndex - titlesPerPage;

    const selectedTitles = sortSongs.slice(firstIndex, lastIndex);

    const theLastPage = total / titlesPerPage;
    const pageNumbers = [];

    for(let i = 0; i < theLastPage; i++){
        pageNumbers.push(i)
    }


    
    return (
        <Fragment>
                
                    {
                        selectedTitles.map((song, index) => <Fragment key={song._id}>
                            <div className="topList-item" key={song._id}>
                                <Link to={`/songs/${song._id}`}> {(currentPage - 1) * titlesPerPage + index + parseFloat(1)}. {song.title} by {song.author} </Link>

                               <div className="list-like-buttons">
                                {
                                    user && song.likes.user === user._id ? <><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up list-like-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up list-like-button"> {song.likes && song.likes.length}</button>
                                }
                                    <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                                </div>

                            </div>
                        </Fragment>)
                    }
                    {
                        songs && pageNumbers.length > 0 && <Fragment>
                            <div className="pageNumbers">
                            {
                                pageNumbers.map(number => <div key={number} className="pageNumber" onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                            </div>
                        </Fragment>
                    }
                    
                    
                
        </Fragment>
    );
}
TopSongs.propTypes = {
    getSongs: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song,
    auth: state.auth
})
export default connect(mapStateToProps, {getSongs, removeLike, addLike})(TopSongs)