import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../actions/post';
import {Moment} from 'react-moment';

const FrontArticles = ({ getPosts, post: {posts, loading} }) => {

    useEffect(() => {
        getPosts()
    }, []);

    const post = posts.map(post=> (post._id, post.text))


    return (
        <Fragment>
            
            <div className="front-news">
            <div className="front-heading">News</div>
            <div className="slider"> {post[0]} </div>
                <div className="news">{post[1]}</div>
                <div className="news">{post[2]}</div>
                <div className="news">{post[3]}</div>
                <div className="news">{post[4]}</div>
            </div>
        </Fragment>
    );
}
FrontArticles.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
//export default connect(mapStateToProps, {getPosts})(FrontArticles);