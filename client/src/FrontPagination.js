import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const FrontPagination = ({user, songs, removeLike, addLike, labelUrl, category, songsLimitPerPage }) => {


    const [currentSongs, setCurrentSongs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage, setSongsPerPage] = useState(songsLimitPerPage);
    

    useEffect(() => {
        const fetchSongs = () => {
            setCurrentSongs(songs.filter(song => song));

        }
        fetchSongs()
    }, [songs]);

    const indexOfLastPost = currentPage * songsPerPage;
    const indexOfFirstPost = 0;
    const selectedSongs = currentSongs.slice(indexOfFirstPost, indexOfLastPost);
    

    const totalSongs = currentSongs.length;
    const lastPageNumber = totalSongs / songsPerPage;
    
    const pageNumbers = []

    for(let i = 1; i <= lastPageNumber; i++){
        pageNumbers.push(i)
    }

    return (
        <Fragment>
        {
            songs == null ? "loading..." : <Fragment>
                <div className="pop-category">
                    {category}
                </div>
            {selectedSongs.map((song, index) => <Fragment key={song._id}>
                
                
                
                <div className="pop-info" key={song._id} >
                    {
                        song.title && <Link to={`/${labelUrl}/${song._id}`}>{index + 1}. {song.title} - {song.author}</Link>
                    }
                    {
                        song.bio && <Link to={`/${labelUrl}/${song._id}`}>{song.images[0] ? <img src={require(`../uploads/authors/image/${song.images[0].image}`)} /> : <img src={require("./style/guitar.png")} />}</Link>
                    }
                    
                    {
                        user && song.title && <div className="song-like-buttons">
                        {
                            user && song.likes.user === user._id ? <><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button>
                        }
                            <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                        </div>
                    }
                    
                
                </div>
                
                
                
            </Fragment>)}
                <div className="front-more">
                    {
                        user ? <Link to={`/top_songs`}>Check more !</Link> : <Link to={`/login`}>Check more !</Link>
                    }
                    
                </div>
            </Fragment>
        }
        
        </Fragment>
    );
}
export default FrontPagination;