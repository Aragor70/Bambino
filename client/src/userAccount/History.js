import React, { useEffect, useState, Fragment } from 'react';
import { getSongs, removeLike, addLike, removeSong, removeView} from '../actions/song';
import { connect } from 'react-redux';
import { getViews } from '../actions/profile';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import SortViews from './SortViews';
import { getAuthors } from '../actions/author';
import PropTypes from 'prop-types';

const History = ({getAuthors, getSongs, getViews, auth:{user}, author, song:{songs, loading}, profile:{views}, removeView, addLike, removeLike, removeSong}) => {

    useEffect(()=>{
        getSongs()
        getViews()
        getAuthors()
    }, []);
 
    useEffect(()=>{
        getViews()
    }, [songs]);

    "YYYY-MM-DD HH:mm:ss"
    "2020-06-29T17:45:03.192Z"

    return (
        <div className="shield">
            <div className="history-content">
                <div className="view-history">
                    <div className="history-title">
                        History of view
                    </div>
                    {
                        views == null ? "No view collection from current week." : <Fragment>
                            
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="0" dayName="Today" />
                                
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="1" dayName="Yesterday" />
                                
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="2"  />
                                
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="3"  />
                        
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="4"  />
                        
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="5"  />
                        
                                <SortViews user={user} views={views} songs={songs} author={author} removeView={removeView} addLike={addLike} removeLike={removeLike} removeSong={removeSong} dayNumber ="6" dayName="Week ago" />
                        
                            
                        </Fragment>
                    }
                    
                </div>

            </div>

        </div>

    );
}
History.propTypes = {
    auth: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    removeSong: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    getViews: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired,
    removeView: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    song: state.song,
    profile: state.profile,
    author: state.author
})
export default connect(mapStateToProps, {addLike ,removeLike, removeSong, getSongs, getViews, getAuthors, removeView})(History);