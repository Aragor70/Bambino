import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {getAuthor} from '../actions/author';
import {addSubscribe, getCurrentProfile} from '../actions/profile';
import PropTypes from 'prop-types';
import AddAlbum from './AddAlbum';
import AuthorAlbum from './AuthorAlbum';
import Alert from '../Alert';
import ReactHtmlParser from 'react-html-parser';
import AddAuthorImage from './AddAuthorImage';
import EditAuthor from './EditAuthor';

const SongAuthor = ({match, getAuthor, author:{author}, profile:{profile, profiles, loading}, addSubscribe, auth:{user}}) => {

    useEffect(() => {
        getAuthor(match.params.id);
    }, []);
    

    
    const subExist = (author && profile && profile.subscribes.find(sub=>sub.author == author._id))
    

    const [albumView, setAlbumView] = useState(false);
    const [imageInputView, setImageInputView] = useState(false);
    const [editInputView, setEditInputView] = useState(false);

    return (
        <Fragment>
            {loading || author == null ? "loading..." : <Fragment>
                <div className="shield-personal">
                    <div className="author-content">
                    
                        <div className="author-top">
                        <div className="author-image">
                        {author.images[0] ? <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/${author.images[0].image}`} className="authorImageSize" /> : <img src={require("../style/guitar.png")} height="32px" />}
                            
                        </div>
                        <div className="author-name">
                            {author.author}
                            
                        </div>
                        </div>
                        <div className="author-main">
                            
                            
                        <div className="author-bio">
                            {author.bio ? ReactHtmlParser(author.bio) : "No stories about this author yet."}
                        </div>
                        
                        
                            <div className="author-buttons">
                                        {
                                            subExist ? <div className="author-button">Subscribed</div> : <div className="author-button" onClick={e=> addSubscribe(match.params.id)}>Subscribe</div>
                                        }
                                        
                                        {
                                            user && user._id == author.user && <Fragment>
                                                <button className="author-button"><img src={ require('../style/edit.png') } height="24px" onClick={e=>setEditInputView(!editInputView)} /></button>
                                                <div className="author-button"><img src={require('../style/uploadPhoto.png')} height="24px" onClick={e=>setImageInputView(!imageInputView)} /></div>
                                                </Fragment>
                                        }
                                        
                                        
                            </div>
                        <div className="author-collection">
                            <p>album collection: {user && user._id == author.user && <img alt="add" height="16.5px" style={{"marginLeft": "10px"}} src={ require('../style/add.png') } onClick={e=>setAlbumView(!albumView)} />}</p>
                            {
                                author.albums == '' ? <div className="albumList">No albums yet.</div> : <Fragment>
                                    <div className="albumList">
                                    {
                                        author.albums.map(album=><AuthorAlbum key={album._id} album={album} />)
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
                                    imageInputView || editInputView && <div className="addshadow"></div>
                                }
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
    auth: state.auth
})
export default connect(mapStateToProps, {getAuthor, addSubscribe, getCurrentProfile})(SongAuthor);