import React, { useEffect, useState, Fragment } from 'react';
import { getSongs, removeLike, addLike, removeSong, removeView } from '../actions/song';
import { connect } from 'react-redux';
import { getViews } from '../actions/profile';
import moment from 'moment';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import FavoriteSong from './FavoriteSong';
import SortViews from './SortViews';
import { getAuthors } from '../actions/author';
import { Link } from 'react-router-dom';

const Library = ({getSongs, getAuthors, getViews, auth:{user}, author:{authors}, song:{songs, loading}, profile:{views}, addLike, removeLike, removeView}) => {

    useEffect(()=>{
        getSongs()
        getViews()
        getAuthors()
    }, [songs]);

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
    
    const sliced4 = songsByUser.slice(0, 4)

    const readySliced4 = []
    sliced4.filter(function(newData){
        return authors.filter(function(oldData){
            if(newData.author == oldData._id){
                readySliced4.push(
                    oldData.images[0] ? oldData.images[0].image : ""
                )
            }
            
        })
    })




  //  console.log(filtred.flat(1).filter(like => like && like.user == user._id))

  let day = moment().subtract('days', 0).format("YYYY-MM-DD");

  const filterFoundViews = views.filter(view=> moment(view.date).format("YYYY-MM-DD") == day)
  
  let mapFoundSongs = filterFoundViews.map(view=> view.song);
  let everySongThatsDay = [];
  for(let i = 0; i < mapFoundSongs.length; i++){

      let song = songs.filter(song=> song._id == mapFoundSongs[i])
      everySongThatsDay.push(song)
  }
  let singlySongs = new Set(everySongThatsDay.flat(1))
  const songsArray = Array.from(singlySongs)

  const findViews = songsArray.map(song => song.views[0])
  //const filterValues = findViews.filter(image => image.authorImage)

  const readyAuthors = []
    findViews.filter(function(newData){
        return authors.filter(function(oldData){
            if(newData.author == oldData._id){
                readyAuthors.push(
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
                            The title ones I like
                            
                       </div>
                       <button type="button" className="liked-more-btn"><Link to="/library/favorites">MORE</Link></button>
                       
                       <div className="liked-song">
                           {
                               sliced4.map((like, index) => <FavoriteSong key={like._id} songs={songs} songId={like.song} classLabel={index} authorImage={readySliced4[index]} user={user} addLike={addLike} removeLike={removeLike} />)
                           }
                       </div>
                    </div>
                    <div className="library-history">
                            <div className="library-label">
                                The views from today - {day}
                            </div>
                            <button type="button" className="liked-more-btn" ><Link to="/history">MORE</Link></button>
                            {
                                songsArray.length > 0 && <Fragment>
                                    <div className="liked-song">
                                    {
                                        songsArray.map((song, index) => <Fragment key={index}>
                                            <div className="liked-box">
                                            <div className="boxed-song" key={index}>
                                                <div className="liked-avatar">{readyAuthors[index] && readyAuthors[index]  ? <img src={require(`../../uploads/authors/image/${readyAuthors[index]}`)} height="32px" /> : <img src={require("../style/guitar.png")} height="32px" />}</div>
                                                <div className="liked-author">{song.author}</div>
                                                <div className="liked-title"><Link to={`/songs/${song._id}`}> {song.title} </Link></div>

                                                <div className="liked-list-buttons">
                                                    {
                                                        user && song.likes.user === user._id ? <><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up liked-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up liked-list-button"> {song.likes && song.likes.length}</button>
                                                    }
                                                    <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down liked-list-button"></button>
                                                    {
                                                    user && findViews[index] && findViews[index].user == user._id && <Fragment>
                                                        <button onClick={e=> removeView(song._id, findViews[index]._id )} className="liked-list-button">X</button>
                                                    </Fragment>
                                                    }
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </Fragment>)
                                    }
                                    </div>
                                </Fragment>
                            }
                        
                    
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
export default connect(mapStateToProps, {getSongs, getViews, removeLike, addLike, removeSong, getAuthors, removeView})(Library);