import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import {removeComment} from '../actions/post';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = ({comment, postId, removeComment, auth:{user, loading}}) => {

    

    return (
        <Fragment>
            {
                !loading && <Fragment>
                    <div className="comment-label">
                <div className="post-label">{comment.avatar.charAt(0) == "/" ? <img src={comment.avatar} height="24px" /> : <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${comment.avatar}`} height="24px" />} {comment.name} {moment(comment.date).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div className="comment-text"> {comment.text} </div>
                {
                    comment.user == user._id && <Fragment>
                        <button onClick={e=> removeComment(postId, comment._id)} className="rm-button">X</button>
                    </Fragment>
                }
                
            </div>
                </Fragment>
            }
            
            
        </Fragment>
        
    );
}
Comment.propTypes = {
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {removeComment})(Comment);