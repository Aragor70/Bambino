import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSongs} from '../actions/song';
import Moment from 'react-moment';

const FrontSongs = ({ getSongs, song: {songs, loading} }) => {

    useEffect(() => {
        getSongs()
    }, []);

    return (
        <Fragment>
            <div className="front-song-content">
                {
                    songs == null || loading ? "loading..." : 
                        songs.map(song=> <Fragment>
                            <div className="song-container">
                                <div className="song-half">
                                    <div className="song-tab">{song.title} </div>
                                    <div className="song-author">{song.author} </div>
                                    <div className="song-choice">text</div><div className="song-choice">about</div>
                                </div>
                                <div className="song-sechalf">
                                <div className="song-textbox">{song.text}</div>
                                </div>
                            </div>
                            
                        </Fragment>)
                            
                }
                
            </div>
        </Fragment>
    );
}
FrontSongs.propTypes = {
    getSongs: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song
})
export default connect(mapStateToProps, {getSongs})(FrontSongs);