import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSongs} from '../actions/song';
import {Moment} from 'react-moment';
import { Link } from 'react-router-dom';

const SongListing = ({ getSongs, song: {songs, loading} }) => {

    useEffect(() => {
        getSongs()
    }, []);

    return (
        <Fragment>
            <div className="song-front-list">
            <div className="song-info-content">
            <div className="front-heading">Song titles</div>
            </div>
            <div className="song-list-content">
                {
                    songs == null || loading ? "loading..." : 
                        songs.map(song=> <div className="song-front-info" key={song._id}><Link to={`/songs/${song._id}`}> {song.title} - {song.author} </Link></div>)
                        
                        
                        
                }
                
            </div>
            </div>

        </Fragment>
    );
}
SongListing.propTypes = {
    getSongs: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song
})
export default connect(mapStateToProps, {getSongs})(SongListing);