import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {getAuthor, getAuthors} from '../actions/author';
import {addSubscribe, getCurrentProfile} from '../actions/profile';
import PropTypes from 'prop-types';
import AddAlbum from './AddAlbum';
import AuthorAlbum from './AuthorAlbum';
import Alert from '../Alert';
import ReactHtmlParser from 'react-html-parser';
import AddAuthorImage from './AddAuthorImage';
import EditAuthor from './EditAuthor';
import { getSongs } from '../actions/song';
import {Link, BrowserRouter as router, Router, Route, Switch} from 'react-router-dom';
import Moment from 'react-moment';
import Album from './Album';

const SongAuthor = ({match, getAuthor, getSongs, getAuthors, song:{songs}, author:{author, authors, loading}, profile:{profile, profiles}, addSubscribe, getCurrentProfile, auth}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [])
    useEffect(() => {
        getAuthor(match.params.id);
        getAuthors()
        getSongs()
    }, []);
    
    function compareFunction(a, b){
        const nameA = a.title;
        const nameB = b.title;

        let comparsion = 0;
        if(nameA > nameB){
            comparsion = 1
        }
        else if(nameA < nameB){
            comparsion = -1
        }
        return comparsion;

    }

    const authorSongs = []

    
    songs.filter(function(oldData){
        return authors.filter(function(newData){
            
            if(oldData.author == newData.author && newData._id == match.params.id){
                
                authorSongs.push({
                    _id: oldData._id,
                    title: oldData.title,
                    author: oldData.author,
                    album: oldData.album ? oldData.album : "Single"
                })

                
            }
        })
    })
    const sortSongs = authorSongs.sort(compareFunction);    

    const subExist = (author && profile && profile.subscribes.find(sub=>sub.author == author._id))
    

    const [albumView, setAlbumView] = useState(false);
    const [imageInputView, setImageInputView] = useState(false);
    const [editInputView, setEditInputView] = useState(false);

    console.log(<img src={require(`../../uploads/${author.images[0].image}`)} />)

    return (
        <Fragment>
            {loading || author == null ? "loading..." : <Fragment>
                <div className="shield-personal">
                    <div className="author-content">
                    
                        <div className="author-top">
                        <div className="author-image">
                        {author.images[0] ? <img src={require(`../../uploads/${author.images[0].image}`)} /> : <img src={require("../style/guitar.png")} height="32px" />}
                            
                        </div>
                        <div className="author-name">
                            <Link to={`/authors/${author._id}`}>{author.author}</Link>
                            
                        </div>
                        </div>
                        <div className="author-main">
                            
                        {
                            profile && <Fragment>
                                <div className="author-buttons">
                                        {
                                            subExist ? <div className="author-button">Subscribed</div> : <div className="author-button" onClick={e=> addSubscribe(match.params.id)}>Subscribe</div>
                                        }
                                        {
                                            auth.user && auth.user._id == author.user && <Fragment>
                                                <button className="author-button"><img src={ require('../style/edit.png') } height="24px" onClick={e=>setEditInputView(!editInputView)} /></button>
                                                <div className="author-button"><img src={require('../style/uploadPhoto.png')} height="24px" onClick={e=>setImageInputView(!imageInputView)} /></div>
                                                </Fragment>
                                        }
                                        
                                        
                                </div>
                            </Fragment>
                        }    

                        <div className="author-bio">
                        
                            {author.bio ? ReactHtmlParser(author.bio) : "No stories about this author yet."}
                        </div>
                        <div className="author-songs">
                            <div className="author-topbar-info">title name<div className="author-album-name-bar">album name</div></div>
                            {
                                authorSongs && authorSongs.map((song, index) => <Fragment key={song._id}>
                                    <div className="authorSong" key={song._id}>
                            <Link to={`/songs/${song._id}`} >{index + 1}. {song.title} <div className="author-album-name">{song.album}</div> </Link>
                                    </div>
                                </Fragment>)
                            }
                        </div>
                        
                        <div className="author-collection">
                            <p>album collection: {auth.user && auth.user._id == author.user && <img alt="add" height="16.5px" style={{"marginLeft": "10px"}} src={ require('../style/add.png') } onClick={e=>setAlbumView(!albumView)} />}</p>
                            {
                                auth.user ? author.albums == '' ? <div className="albumList">No albums yet.</div> : <Fragment>
                                    <div className="albumList">
                                    {
                                        author.albums.map(album => <AuthorAlbum key={album._id} _id={album._id} authorId={match.params.id} album={album} authorSongs={authorSongs} user={auth.user} loading={auth.loading} />)
                                    }

                                    </div>
                                </Fragment>
                                :
                                author.albums == '' ? <div className="albumList">No albums yet.</div> : <Fragment>
                                    <div className="albumList">
                                    {
                                        author.albums.map(album => <AuthorAlbum key={album._id} _id={album._id} authorId={match.params.id} album={album} authorSongs={authorSongs} user="none" />)
                                    }

                                    </div>
                                </Fragment>
                            }
                        </div>
                                        

                        <div className="author-metric">
                            <p>metric details</p>
                            
                            <div className="author-info"><div className="mini-label">nationality: </div>
                            {author.nationality ? author.nationality : "None"}
                            </div>
                            <div className="author-info"><div className="mini-label">age: </div>   
                            {author.age ? author.age : "None"}
                            </div>
                            <div className="author-info"><div className="mini-label">genres: </div>
                            {author.genres ? author.genres : "None"}
                            </div>
                            <div className="author-info"><div className="mini-label">instruments: </div>
                            {author.instruments ? author.instruments : "None"}
                            </div>
                        </div>
                        </div>

                        {
                            albumView && <Fragment><AddAlbum author={author} authorId={author._id} albumView={albumView} setAlbumView={setAlbumView} /></Fragment>
                        }
                        {
                            albumView && <div className="addshadow"></div>
                        }
                    
                        <Alert />
                        
                                {
                                    editInputView && <EditAuthor editInputView={editInputView} setEditInputView={setEditInputView} authorId={author._id} />
                                }
                                {
                                    imageInputView && <AddAuthorImage author={author} imageInputView={imageInputView} setImageInputView={setImageInputView} />
                                }
                                {
                                    editInputView && <div className="addshadow"></div>
                                }
                                {
                                    imageInputView && <div className="addshadow"></div>
                                }

                    </div>
                </div>
                
                </Fragment>
                }
                

        </Fragment>
    );
}
SongAuthor.propTypes = {
    getAuthor: PropTypes.func.isRequired,
    addSubscribe: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    author: state.author,
    profile: state.profile,
    auth: state.auth,
    song: state.song
})
export default connect(mapStateToProps, {getAuthor, addSubscribe, getCurrentProfile, getSongs, getAuthors})(SongAuthor);