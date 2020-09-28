import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSongs, removeLike, addLike } from '../actions/song'
import FrontPagination from '../FrontPagination';


const MainSongs = ({ song: {songs}, removeLike, addLike, user }) => {

    useEffect(() => {
        getSongs()

    }, [getSongs])

        return (
            
            <Fragment>
                <div className="shield-personal">
                    <div className="front-songs-content">
                    <div className="front-songs-side" style={{"backgroundColor": "#121212"}}>
                        
                        <FrontPagination songs={songs} removeLike={removeLike} addLike={addLike} user={user} category="New song titles" labelUrl="songs" songsLimitPerPage="20" front={false} />
                        
                        
                    </div>
                    
                        
                         
                    </div>
                </div>
            </Fragment>
        )
}
const mapStateToProps = state => ({
    song: state.song
})
export default connect(mapStateToProps, {getSongs, removeLike, addLike})(MainSongs);