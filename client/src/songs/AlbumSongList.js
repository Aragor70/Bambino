import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

const AlbumSongList = ({album:{album, year, _id}, authorSongs, user="none", addLike, removeLike, setSongExist}) => {

    const albumSongs = authorSongs.filter(song => song.album == album)

    useEffect(() => {
        setSongExist(albumSongs.length)
    },[albumSongs])
    return (
        <Fragment>
            {
                album == null || authorSongs == null ? 'loading...' : <Fragment>
                    {
                        albumSongs.map((song, index) => song.album == album && <Fragment key={song._id}>
                            <div className="album-song" key={song._id}>
                    <Link to={`/songs/${song._id}`}> {index + 1}. {song.title}</Link>
                            {
                                user && <Fragment>
                                    <div className="song-list-buttons">
                                    {
                                        user && song.likes.user === user._id ? <><div className="liked"></div><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button>
                                    }
                                        <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                                    </div>
                                </Fragment>
                            }
                            
                            </div>
                            </Fragment>)
                            
                    }
                </Fragment>
            }
        </Fragment>
    );
}
AlbumSongList.propTypes = {
    album: PropTypes.object.isRequired
}
export default AlbumSongList;