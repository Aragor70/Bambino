import React, { Fragment, useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addLike, removeLike, addComment, getSong, removeSong, addView} from '../actions/song';
import Comment from './Comment';
import ReactHtmlParser from 'react-html-parser';
import AddSongTrack from './AddSongImage';
import EditSong from './EditSong';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';

const Song = ({videoUrl, history, match, song:{song, loading, songs}, auth:{user}, getSong, addView, addLike, removeLike, addComment, removeSong}) => {

    

    useEffect(() => {
        addView(match.params.id);
    }, []);
    
    useEffect(() => {
        getSong(match.params.id);
    }, [getSong, songs]);

    const [imageInputView, setImageInputView] = useState(false);
    const [editInputView, setEditInputView] = useState(false);

    const [toggleComment, setComment] = useState(false)
    const [toggleButtons, setButtons] = useState(false)
    const [text, setText] = useState('');

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
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }
    }, [toggleComment])
    
    // <div className="song-label">{user && user.avatar.charAt(0) == "/" ? <img src={user.avatar} height="24px" /> : <img src={require(`../../uploads/avatar/${user.avatar}`)} height="24px" />} {song.name} </div>

    return(
        <Fragment>
        <div className="shield">
            <div className="profile-mid">
                <div className="profile-page-title">SONG</div>
            </div>
        </div>
        <div className="shield">
        <div className="song-content">
        {
                loading || song == null ? ("loading...") : <Fragment>

        {
            song.video && <Fragment>
                <div className="song-video"><div>
                    <ReactPlayer controls={true} url={song.video} width="100%" />
                
                </div></div>
            </Fragment>
        }
                    
        <div className="song-main">
                     
            <div className="song-bar">{song.author} - {song.title}</div>
                <div className="song-text">{ReactHtmlParser(song.text)}</div>
                
                {
                    user && <Fragment>
                        <div className="song-buttons">
                        {
                            user && song && song.likes.user === user._id ? <><div className="liked"></div><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-button"> {song.likes && song.likes.length}</button>
                        }
                        <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                        <button className="song-button" onClick={e=> setComment(!toggleComment)}>Comment</button>
                        </div>
                        <div className="song-buttons">
                        <div className="song-views-button">{song.views && song.views.length+" views"+ReactHtmlParser('&nbsp')}<Moment format="DD-MM-YYYY">{song.date}</Moment></div>
                        </div>
                        
                            {
                                user && song.user == user._id && <Fragment><div className="mod-song-buttons">
                                    <button className="edit-song-button"><img src={ require('../style/uploadPhoto.png') } height="24px" onClick={e=>setImageInputView(!imageInputView)} /></button>
                                    <button className="edit-song-button"><img src={ require('../style/edit.png') } height="24px" onClick={e=>setEditInputView(!editInputView)} /></button>
                                    <button onClick={e=> {removeSong(song._id), history.push('/')}} className="rm-song-button">X</button>
                                    </div>
                                        {
                                            imageInputView && <AddSongTrack imageInputView={imageInputView} setImageInputView={setImageInputView} user={user} song={song} />
                                        }
                                        {
                                            imageInputView && <div className="addshadow"></div>
                                        }
                                        {
                                            editInputView && <EditSong editInputView={editInputView} setEditInputView={setEditInputView} user={user} songId={song._id} />
                                        }
                                        {
                                            editInputView && <div className="addshadow"></div>
                                        }
                                </Fragment>
                            }
                    </Fragment>
                }
                {
                    !user && <Fragment>
                        <div className="song-buttons">
                            <div className="song-views-button">{song.views && song.views.length+" views"+ReactHtmlParser('&nbsp')}<Moment format="DD-MM-YYYY">{song.date}</Moment></div>
                        </div>
                    </Fragment>
                }
                    </div>
                    
                {
                    (song.album || song.publicationYear || song.category || song.language || song.image) &&
                <div className="song-metrics">
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
                    <div className="post-label">{song.avatar.charAt(0) == "/" ? <img src={song.avatar} height="24px" /> : <img src={require(`../../uploads/avatar/${song.avatar}`)} height="24px" />} {song.name}, <Moment format="YYYY-MM-DD">{song.date}</Moment> </div>
                
                </div>
                 
                }
            {
                toggleComment == true && <Fragment> 
                    <div className="profile-comment" ref={scrollTo}>
                        <button type="button" className="x-bottom-right" onClick={e=>setComment(!toggleComment)}>X</button>
                        
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
        </Fragment>
        } 
        </div>
        </div>
        </Fragment>
    );
}
Song.propTypes = {
    addComment: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    getSong: PropTypes.func.isRequired,
    removeSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    song: state.song
})
export default connect(mapStateToProps, { getSong, removeSong, addLike, addView, removeLike, addComment })(withRouter(Song));