import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

const PostPagination = ({user, posts, label, labelUrl, postsLimitPerPage, numbers = true }) => {


    const [currentPosts, setCurrentPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(postsLimitPerPage);
    

    useEffect(() => {
        const fetchPosts = () => {
            setCurrentPosts(posts.filter(post => post.user == user._id ? (post._id, post) : null));
        }
        fetchPosts();
    }, [posts]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const selectedPosts = currentPosts.slice(indexOfFirstPost, indexOfLastPost);


    const totalPosts = currentPosts.length;
    const lastPageNumber = Math.ceil(totalPosts / postsPerPage);
    
    const pageNumbers = []

    for(let i = 1; i <= lastPageNumber; i++){
        pageNumbers.push(i)
    }

    let profilePosts = posts.filter(song => song.user == user._id);

    
    return (
        <Fragment>
        
        {
            posts == null ? <div className="posts-label">loading...</div> : <div className="posts-label">
            {selectedPosts.map(post => post.user == user._id && <Fragment key={post._id}>

                <div className="posts-info" key={post._id}><Link to={`/profile/${user._id}/${labelUrl}/${post._id}`}>{post.title} </Link>
                <div className="posts-date">{moment(post.date).format("YYYY-MM-DD HH:mm:ss")}</div>
                </div>
                
            </Fragment>)}
            {
                posts && numbers && pageNumbers.length > 0 && <Fragment>
                    <div className="pageNumbers">
                    {
                    pageNumbers.map(number=><div className="pageNumber" onClick={e=>setCurrentPage(number)}> {number} </div>)
                    }
                </div>
                </Fragment>
            }
            
            </div>
        }
        
        </Fragment>
    );
}
export default PostPagination;