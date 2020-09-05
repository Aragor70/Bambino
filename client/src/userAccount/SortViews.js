import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import {Link, BrowserRouter as Router} from 'react-router-dom';


    const SortViews = ({author:{authors}, user, songs, views, removeView, addLike, removeLike, removeSong, dayNumber, dayName = moment().subtract('days', dayNumber).format("dddd")}) => {

    let day = moment().subtract('days', dayNumber).format("YYYY-MM-DD");

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
    const [contentStyle, setContentStyle] = useState({height:'21vh'})
    const handleContent = () => {
        if(contentStyle.height == '21vh'){
            setContentStyle({
                height: 'auto'
            })
        } else {setContentStyle({height: '21vh'})}
    }


    //<div className="head-view-avatar">{song.views[0] && song.views[0].author  ? <img src={require(`../../uploads/authors/image/${readyAuthors.images[0]}`)} height="32px" /> : <img src={require("../style/guitar.png")} height="32px" />}</div>
    return (
        <Fragment>
            {
                songsArray.length > 0 && <Fragment>
                    <div className="history-views-day">
                        {dayName} - {day}
                    </div>
                    <div className="history-views">
                    {
                        songsArray.map((song, index) => <Fragment key={index}>
                            <div className="view-box" key={index}>
                                <div className="head-view">
                                <div className="head-view-buttons">
                                        <div className="head-view-button">{song.views && song.views.length+" views"}</div>
                                        <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up head-view-button"> {song.likes && song.likes.length}</button>
                                        <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down head-view-button"></button>
                                        {
                                            user && findViews[index] && findViews[index].user == user._id && <Fragment>
                                                <button onClick={e=> removeView(song._id, findViews[index]._id )} className="head-view-button">X</button>
                                            </Fragment>
                                        }
                                    </div>

                                    
                                    <div className="head-view-avatar">{readyAuthors[index] && readyAuthors[index]  ? <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/${readyAuthors[index]}`} height="32px" /> : <img src={require("../style/guitar.png")} height="32px" />}</div>
                                    <div className="head-view-author">{song.author}</div>
                                    <div className="head-view-title"><Link to={`/songs/${song._id}`}> {song.title} </Link></div>
                                
                                    
                                    
                                </div>
                                <div className="content-view" style={contentStyle} onClick={e=> handleContent('auto')}>
                                    {
                                        song.image && <Fragment>
                                            <div className="song-image-view">
                                                <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/authors/image/${song.image}`} />
                                            </div>
                                        </Fragment>
                                    }
                                    {
                                        song.text && <Fragment>
                                            <div className="song-text-view">
                                            {ReactHtmlParser(song.text)}
                                            <div className="view-user">{song.avatar.charAt(0) == "/" ? <img src={song.avatar} height="24px" /> : <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${song.avatar}`} height="15.5px" />} {song.name}, <Moment format="YYYY-MM-DD">{song.date}</Moment> </div>
                                            </div>
                                            
                                        </Fragment>
                                    }
                                    
                                </div>

                            </div>
                        </Fragment>)
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    );
    }
    export default SortViews;