import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {getSongs, removeLike, addLike} from '../actions/song';
import Moment from 'react-moment';
import Pagination from './Pagination';


const Songs = ({profile:{ user, _id }, getSongs, song: {songs, loading}, removeLike, addLike }) => {

    useEffect(() => {
        getSongs()
    }, []);

    

    return (
        <Fragment>
            <div className="songs-content">
            
            <Pagination user={user} songs={songs} removeLike={removeLike} addLike={addLike} label="Songs" labelUrl="songs" songsLimitPerPage="10"  />
            
            </div>
        
        </Fragment>
    );
}
Songs.propTypes = {
    getSongs: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song
})
export default connect(mapStateToProps, {getSongs, removeLike, addLike})(Songs)