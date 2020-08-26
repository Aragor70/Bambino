import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {addLike, removeLike, addComment, getSong, removeSong, addView} from '../actions/song';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Comment from './Comment';
import Moment from 'react-moment';
import ReactPlayer from 'react-player';

const SongPublic = ({match, getSong, removeSong, addLike, addView, removeLike, addComment, auth:{user}, song:{song, loading, songs}}) => {
    
    useEffect(() => {
        getSong(match.params.id);
    }, [getSong, songs]);
    useEffect(() => {
        addView(match.params.id);
    }, [])

    const [image, setImage] = useState(null)
    const [toggleButtons, setButtons] = useState(false)
    const [text, setText] = useState('');

    const [albumView, setAlbumView] = useState(false);
    const [toggleComment, setComment] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(match.params.id, {text})
        setText('')
    }
    const handleComment = (e) => {
        setButtons(true);
    }
    const handleChange = (e) => {
        setText(e.target.value)

    }

    return (
        <Fragment>
            {loading || song == null ? "loading..." : <Fragment>
                <div className="shield-personal">
                    
                    {
                        song.video && <Fragment>
                            <div className="song-video"><div>
                                <ReactPlayer controls={true} url={song.video} width="100%" />
                            
                            </div></div>
                        </Fragment>
                    }
                    
                    <div className="profile-content">

                    <div className="song-title-bar">{song.author} - {song.title}</div>
                <div className="song-text">{ReactHtmlParser(song.text)}</div>
                
                    {
                        user && <Fragment>
                            <div className="ftrs-buttons">
                            <div className="ftrs-button">{song.views && song.views.length+" views "}<Moment format="DD-MM-YYYY">{song.date}</Moment></div>
                                <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up ftrs-button"> {song.likes && song.likes.length}</button>
                                <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down ftrs-button"></button>
                                <button className="ftrs-button" onClick={e=> setComment(!toggleComment)}>Comment</button>
                                {
                                    user && song.user == user._id && <Fragment>
                                        <button className="ftrs-button"><img src={ require('../style/edit.png') } height="24px" /></button>
                                        <button onClick={e=> removeSong(song._id)} className="rm-button">X</button>
                                    </Fragment>
                                }
                            </div>
                        </Fragment>
                    }
                    

                        <div className="author-label-half">
                            {
                    (song.album || song.publicationYear || song.category || song.language || song.image) &&
                    <div className="profile-content">
                    <div className="song-label">    
                        Song metric
                    </div>
                    
                    
                    <tr className="song-info">
                    
                    <td>album:</td><td>{song.album ? song.album : "None"}</td>
                    
                    </tr>
                    <tr className="song-info">
                    
                    <td>publicated:</td><td>{song.publicationYear ? song.publicationYear : "None"}</td>
                    
                    </tr>
                    <tr className="song-info">
                    
                    <td>category:</td><td>{song.category ? song.category : "None"}</td>
                    
                    </tr>
                    <tr className="song-info">
                    
                    <td>language:</td><td>{song.language ? song.language : "None"}</td>
                    
                    </tr>
                    
            
                    </div>
                }
                        </div>
            {
                user && toggleComment == true && <Fragment> 
                    <div className="profile-comment">
                    <button type="button" className="x-top-right" onClick={e=>setComment(!toggleComment)}>X</button>
                        <div className="comment-label">
                            <form onSubmit={e=>handleSubmit(e)}>
                            
                                <input type="text" name="text" value={text} onChange={e=>handleChange(e)} onClick={e=>handleComment(e)} className="commentInput" placeholder=" .Add public comment." />
                                {
                                    toggleButtons && <Fragment>
                                        <div className="comm-buttons">
                                        <button className="ftrs-button" onClick={e=>setButtons(!toggleButtons)} >Cancel</button><button type="submit" className="ftrs-button">Comment</button>
                                        </div>
                                    </Fragment>
                                }
                            </form>
                        </div>
                        {
                            song.comments && <Fragment>
                                <div className="comment-label">
                                    {song.comments.map(comment=> <Comment key={comment._id} comment={comment} songId={song._id} />)}
                                </div>
                            </Fragment>
                        }
                    </div>
                    
                </Fragment>
            } 
               
                    </div>
                </div>
                
                </Fragment>
                }
                

        </Fragment>
    );
}
SongPublic.propTypes = {
    addComment: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    getSong: PropTypes.func.isRequired,
    removeSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song,
    auth: state.auth
});
export default connect(mapStateToProps, {getSong, removeSong, addView, addLike, removeLike, addComment})(SongPublic);