import React, { useEffect, useState, Fragment } from 'react';
import { getSongs, removeLike, addLike, removeSong } from '../actions/song';
import { connect } from 'react-redux';
import { getViews } from '../actions/profile';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import {Link, BrowserRouter as Router} from 'react-router-dom';


const FavoriteSong = ({songs, songId, authorImage, user, removeLike}) => {

    let filterSongs = songs.filter(song => song._id == songId)

    return (
        <div className="liked-box">
            <div className="boxed-song">
                {
                    filterSongs.map(song => <Fragment key={song._id}>
                        <div className="liked-avatar">{authorImage ? <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/author/image/${authorImage}`} height="32px" width="32px" /> : <img src={require("../style/guitar.png")} height="32px" width="32px" />}</div>
                        <div className="liked-author">{song.author}</div>
                        <div className="liked-title"><Link to={`/songs/${song._id}`}> {song.title} </Link></div>

                        <div className="liked-list-buttons">
                            {
                                user && song.likes.user === user._id ? <><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up liked-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up liked-list-button"> {song.likes && song.likes.length}</button>
                            }
                            <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down liked-list-button"></button>
                        </div>
                    </Fragment>)
                }
            </div>
        </div>
    );
}
export default FavoriteSong;