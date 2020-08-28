import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const Pagination = ({user, songs, removeLike, addLike, label, labelUrl, songsLimitPerPage, numbers = true }) => {


    const [currentSongs, setCurrentSongs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage, setSongsPerPage] = useState(songsLimitPerPage);
    

    useEffect(() => {
        const fetchSongs = () => {
            setCurrentSongs(songs.filter(song => song.user == user._id ? (song._id, song) : null));

        }
        fetchSongs()
    }, [songs]);

    const indexOfLastPost = currentPage * songsPerPage;
    const indexOfFirstPost = indexOfLastPost - songsPerPage;
    const selectedSongs = currentSongs.slice(indexOfFirstPost, indexOfLastPost);


    const totalSongs = currentSongs.length;
    const lastPageNumber = totalSongs / songsPerPage;
    
    const pageNumbers = []

    for(let i = 1; i < lastPageNumber + 1; i++){
        pageNumbers.push(i)
    }

    let profileSongs = songs.filter(song => song.user == user._id);
    
    return (
        <Fragment>
        
        
        {
            songs == null ? <div className="song-label">loading...</div> : <div className="song-label">
            {selectedSongs.map(song => song.user == user._id && <Fragment key={song._id}>
                
                <div className="song-info" key={song._id}><Link to={`/profile/${user._id}/${labelUrl}/${song._id}`}>{song.author} - {song.title} </Link>
                <div className="song-list-buttons">
                {
                    user && song.likes.user === user._id ? <><div className="liked"></div><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button>
                }
                    <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                </div>
                </div>
                
            </Fragment>)}
            {
                songs && numbers && pageNumbers.length > 0 && <Fragment>
                    <div className="pageNumbers">
                    {
                    pageNumbers.map(number=><div className="pageNumber" onClick={e=>setCurrentPage(number)}> {number} </div>)
                    }
                    </div>
                </Fragment>
            }
            
            </div>
        }
        
        </Fragment>
    );
}
export default Pagination;