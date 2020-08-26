import React, { Fragment, useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { addLike, removeLike, removePost, addComment, getPost, addView } from '../actions/post';
import {connect} from 'react-redux';
import Comment from './Comment';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';

const Post = ({match, history, post:{post, loading, posts}, addLike, removeLike, removePost, addComment, auth:{user}, getPost, addView}) => {

    useEffect(() => {
        addView(match.params.id)
    }, []);
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, posts]);

        

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

    const scrollToComments = useRef(null)
    
    useEffect(() => {
        if(scrollToComments.current){
            scrollToComments.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        }
        
    }, [toggleComment])


    return (
        <Fragment>
        <div className="shield">
            <div className="profile-mid">
                <div className="profile-page-title">POST</div>
            </div>
        </div>
        <div className="shield">
        <div className="post-content">
            {
                loading || post == null ? "loading..." : <Fragment>
                    
                    <div className="post-main" >
                         
                        <div className="post-info">{post.title}</div>
                        <div className="post-info">{ReactHtmlParser(post.text)}</div>
                        
                            <div className="post-buttons" >
                            <div className="post-views-button">{post.views && post.views.length+" views "}<Moment format="DD-MM-YYYY">{post.date}</Moment></div>
                            <button onClick={e=> addLike(post._id)} className="fa fa-thumbs-up ftrs-button"> {post.likes && post.likes.length}</button>
                            <button onClick={e=> removeLike(post._id)} className="fa fa-thumbs-down ftrs-button"></button>
                            <button className="ftrs-button" onClick={e=> setComment(!toggleComment)}>Comment</button>
                            {
                                post.user == user._id && <Fragment>
                                    <button onClick={e=> {removePost(post._id), history.push('/')}} className="rm-button">X</button>
                                </Fragment>
                            }
                            
                        </div>
                        <div className="post-label">{post.avatar.charAt(0) == "/" ? <img src={post.avatar} height="24px" /> : <img src={require(`../../uploads/avatar/${post.avatar}`)} height="24px" />} {post.name}, <Moment format="YYYY-MM-DD">{post.date}</Moment> </div>
                        </div>
                        {
                toggleComment == true && <Fragment> 
                    <div className="profile-comment" ref={scrollToComments}>
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
                            post.comments && <Fragment>
                                <div className="comment-label">
                                    {post.comments.map(comment=> <Comment key={comment._id} comment={comment} postId={post._id} />)}
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
Post.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    addView: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})
export default connect(mapStateToProps, {addLike, removeLike, removePost, addComment, getPost, addView})(withRouter(Post));