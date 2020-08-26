import React, { useEffect, useState, Fragment } from 'react';
import { getSongs, removeLike, addLike, removeSong } from '../actions/song';
import { connect } from 'react-redux';
import { getViews } from '../actions/profile';
import moment from 'moment';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import FavoriteSong from './FavoriteSong';
import SortViews from './SortViews';
import { getAuthors } from '../actions/author';
import { Link } from 'react-router-dom';

const Library = ({getSongs, getAuthors, getViews, auth:{user}, author:{authors}, song:{songs, loading}, profile:{views}, addLike, removeLike}) => {

    useEffect(()=>{
        getSongs()
        getViews()
        getAuthors()
    }, []);

    const filtredSongs = songs.map(song => song.likes);
    
    let songsByUser = filtredSongs.flat(1).filter(song => song.user == user._id);

    function compareFunction(a, b){
        const dateA = moment(a.date).format("YYYY-MM-DD HH:mm:ss")
        const dateB = moment(b.date).format("YYYY-MM-DD HH:mm:ss")
        let comparsion = 0
        if(dateA > dateB){
            comparsion = -1
        }
        else if(dateA < dateB){
            comparsion = 1
        }
        return comparsion
    }

    songsByUser.sort(compareFunction)
    
    const readySongsByUser = []
    songsByUser.filter(function(newData){
        return authors.filter(function(oldData){
            if(newData.author == oldData._id){
                readySongsByUser.push(
                    oldData.images[0] ? oldData.images[0].image : ""
                )
            }
        })
    })

  
    return (
       <div className="shield-personal">
           <div className="library-content">
               <div className="library-songs">
                    
                    <div className="liked-songs">
                       
                       <div className="library-label">
                            All title ones I like
                       </div>
                       
                       <div className="liked-song">
                           {
                               songsByUser.map((like, index) => <FavoriteSong key={like._id} songs={songs} songId={like.song} classLabel={index} authorImage={readySongsByUser[index]} user={user} addLike={addLike} removeLike={removeLike} />)
                           }
                       </div>
                    </div>
                </div>

           </div>
           
       </div>
        
        
    );
}
const mapStateToProps = state => ({
    auth: state.auth,
    song: state.song,
    profile: state.profile,
    author: state.author
})
export default connect(mapStateToProps, {getSongs, getViews, removeLike, addLike, removeSong, getAuthors})(Library);