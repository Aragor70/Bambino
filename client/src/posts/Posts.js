import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {getPosts} from '../actions/post';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Post from './Post';
import PostPagination from './PostPagination';

const Posts = ({profile:{user}, getPosts, post: {posts, loading}}) => {

    useEffect(()=>{
        getPosts()
    }, [loading]);

    return (
        <Fragment>
            <div className="posts-content">
            
            <PostPagination user={user} posts={posts} label="Posts" labelUrl="posts" postsLimitPerPage="10"  />
            
            </div>
        
        </Fragment>
    );
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPosts})(Posts);