import React, { Fragment, useEffect, useState } from 'react';
import { getAuthor, getAuthors, removeAlbum } from '../actions/author';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSongs, addLike, removeLike } from '../actions/song';
import AlbumSongList from './AlbumSongList';
import { Link, withRouter } from 'react-router-dom';
import AddAlbumImage from './AddAlbumImage';
import EditAlbum from './EditAlbum';

const Album = ({match, history, getAuthor, getSongs, auth:{user}, author:{author, authors, loading}, song:{songs}, getAuthors, editAlbum, addLike, removeLike, removeAlbum}) => {

    useEffect(() => {
        getAuthor(match.params.author_id);
        getSongs()
        getAuthors()
    }, [getAuthor, match.params.author_id]);

    
    const [imageInputView, setImageInputView] = useState(false);
    const [editInputView, setEditInputView] = useState(false);
    
    
    const authorSongs = []

    songs.filter(function(oldData){
        return authors.filter(function(newData){
            
            if(oldData.author == newData.author && newData._id == match.params.author_id ){
                
                authorSongs.push({
                    _id: oldData._id,
                    title: oldData.title,
                    author: oldData.author,
                    album: oldData.album ? oldData.album : "Single",
                    likes: oldData.likes
                })
            }
        })
    })
    
    
    const [songExist, setSongExist] = useState(1);

return (
    <Fragment>
        
        {
            loading || author == null ? "loading..." : <Fragment>
                {
                    author.albums.map(album => album._id == match.params.id && <Fragment key={album._id}>

                        <div className="shield-personal" key={album._id}>
                            <div className="album-content">
                                
                                <div className="album-page-name"><Link to={`/authors/${author._id}`}>{author.author}</Link></div>
                                
                                    <div id="album-picture"> {album.images[0] ? <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/author/album/image/${album.images[0].image}`} /> : <img src={require("../style/guitar.png")} height="32px" />} </div>
                                    <div className="album-main">
                                        
                                        <div className="album-name-bar">
                                        {
                                            user && user._id == author.user && <Fragment>
                                                <div className="album-buttons">
                                                    {
                                                        songExist == 0 && <div className="album-button"><div className="rm-song-button" onClick={e => {removeAlbum(author._id, album._id), history.push(`/authors/${author._id}`)}}>X</div></div>
                                                    }
                                                    <div className="album-button"><img src={ require('../style/edit.png') } height="24px" onClick={e=>setEditInputView(!editInputView)} /></div>
                                                    <div className="album-button"><img src={require('../style/uploadPhoto.png')} height="24px" onClick={e=>setImageInputView(!imageInputView)} /></div>       
                                                </div>
                                            </Fragment>
                                        }  
                                            {album.album} ({album.year})
                                        </div>
                                        <div className="topbar-info">title name<div className="album-name">likes</div></div>
                                        <div className="album-songs">
                                            
                                            <AlbumSongList album={album} authorSongs={authorSongs} user={user} addLike={addLike} removeLike={removeLike} setSongExist={setSongExist} />
                                            
                                        </div>
                                        
                                    </div>
                                {
                                    imageInputView && <AddAlbumImage author_id={author._id} album={album} imageInputView={imageInputView} setImageInputView={setImageInputView} />
                                }
                                {
                                    imageInputView && <div className="addshadow"></div>
                                }
                                {
                                    editInputView && <EditAlbum author_id={match.params.author_id} album={album} editInputView={editInputView} setEditInputView={setEditInputView} />
                                }
                                {
                                    editInputView && <div className="addshadow"></div>
                                }
                            </div>
                        </div>

                    </Fragment>)
                }
            </Fragment>
        }
                

    </Fragment>
);
}
Album.propTypes = {
    author: PropTypes.object.isRequired,
    getAuthor: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired
}
const mapstateToProps = state => ({
    author: state.author,
    song: state.song,
    auth: state.auth
})
export default connect(mapstateToProps, {getAuthor, getSongs, getAuthors, addLike, removeLike, removeAlbum})(withRouter(Album));

