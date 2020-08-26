import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import Album from './Album';

const AuthorAlbum = ({album, authorId, authorSongs, user}) => {

    const albumSongs = authorSongs.map(song => song.album)
    //const showAlbum = album.user == user._id.toString() && album.album
    
    const songExist = authorSongs.map(song => song.album == album.album && album || user._id == album.user && album )
    let x = (songExist) => songExist.filter((v, i) => songExist.indexOf(v) == i)
    x(songExist)

    let filtredValues = x(songExist).filter(album => album.album )
    
    return (
        <Fragment>
            {
                filtredValues.map(album => <Fragment>
                    <div className="author-info"><div className="mini-label">{album.year} </div>
                        <Link to={`/authors/${authorId}/album/${album._id}`}>{album.album}</Link>
                    
                    </div>
                </Fragment>)
            }
        </Fragment>
    );
}
AuthorAlbum.propTypes = {
    album: PropTypes.object.isRequired
}
export default AuthorAlbum;