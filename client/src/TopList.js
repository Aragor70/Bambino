import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {getSongs, removeLike, addLike} from './actions/song';
import {getAuthors} from './actions/author';
import Moment from 'react-moment';
import TopSongs from './songs/TopSongs';
import { getProfiles } from './actions/profile';
import TopAuthors from './songs/TopAuthors';
import ReactHtmlParser from 'react-html-parser';


const TopList = ({getSongs, getAuthors, getProfiles, profile:{profiles}, auth:{user}, author:{authors}, song: {songs, loading}, removeLike, addLike }) => {

    useEffect(() => {
        getSongs()
        getAuthors()
        getProfiles()
    }, []);

    const [titleView, setTitleView] = useState(true);
    const [authorView, setAuthorView] = useState(false);

    function compareLikes(a, b){
        const valueA = a.likes.length
        const valueB = b.likes.length

        let comparsion = 0;
        if(valueA < valueB){
            comparsion = 1
        }
        else if(valueA > valueB){
            comparsion = -1
        }
        return comparsion
    }
    const sortSongs = songs.sort(compareLikes)

    const [title, setTitle] = useState([])
    const [author, setAuthor] =useState([])

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const destructSongs = sortSongs.map(song => song.title.toLowerCase())

    const searchData = []

    const titleData = title.length !== 0 && title.toLowerCase()

    for(let i = 0; i < destructSongs.length; i++){
        searchData.push( destructSongs[i].includes(titleData) && destructSongs[i])
    }

    const trueTitles = searchData.filter(title=>title)

    const indexData = []

    for(let i = 0; i < sortSongs.length; i++){
        indexData.push({index : i + parseFloat(1), title: sortSongs[i].title, author:sortSongs[i].author, likes: sortSongs[i].likes, _id:sortSongs[i]._id})
    }
    const searchingData = []
    for(let i = 0; i < trueTitles.length; i++){
        searchingData.push({title: trueTitles[i]})
    }

    const rankValues = []
    indexData.filter(function(newData){
        return searchingData.filter(function(oldData){
            if(newData.title.toLowerCase() == oldData.title.toLowerCase()){
                rankValues.push({index: newData.index, title: newData.title, author:newData.author, likes:newData.likes, _id:newData._id})
            }  
         })
    })



    const mapSubscribes = profiles.map(profile => profile.subscribes)
    const authorsArray = mapSubscribes.flat(1).map(sub => sub.author)
    
        function compare(a, b){
            const authorA = a.number
            const authorB = b.number
            let comparsion = 0
            if(authorA < authorB){
                comparsion = 1
            }
            else if(authorA > authorB){
                comparsion = -1
            }
            return comparsion;
        }
        
    let count = [];
    authorsArray.forEach((i) => { count[i] = (count[i] || 0) + 1;});
    
    let values = []
        for (var element in count) {
            values.push({author: element, number: count[element]});
            
        }
    const sortedByValue = values.sort(compare)
        
        
    let authorsBySubValue = []

        sortedByValue.filter(function(newData){
            return authors.filter(function(oldData){
                
                if(newData.author == oldData._id){
                    authorsBySubValue.push({
                        '_id': newData.author,
                        'name': oldData.author,
                        'number': newData.number
                    })
                }

            })
        });

        const destructAuthors = authorsBySubValue.map(author => (author._id, author))
        
        const searchAuthors = []

        const authorInput = author.length !== 0 && author.toLowerCase()

        for(let i = 0; i < destructAuthors.length; i++){
            searchAuthors.push( destructAuthors[i].name.toLowerCase().includes(authorInput) && destructAuthors[i])
        }
        const trueAuthors = searchAuthors.filter(author => author);

        

        const indexAuthor = []

        for(let i = 0; i < sortedByValue.length; i++){
            indexAuthor.push({index : i + parseFloat(1), author: sortedByValue[i].author, number: sortedByValue[i].number})
        }
        const searchingAuthor = []
        for(let i = 0; i < trueAuthors.length; i++){
            searchingAuthor.push({author: trueAuthors[i].name, _id: trueAuthors[i]._id})
        }
        

        const rankAuthor = []
        indexAuthor.filter(function(newData){
            return searchingAuthor.filter(function(oldData){
                if(newData.author == oldData._id){
                    rankAuthor.push({index: newData.index, _id: newData._id, author: oldData.author, number: newData.number })
                }
            })
        })

    return (
        <Fragment>
            <div className="shield">
                <div className="topList-content">
                    <div className="list-selector">
                        <div style={{"cursor" : "pointer"}} onClick={e=>{setTitleView(true), setAuthorView(false), setAuthor('')}}>Top title </div>{ReactHtmlParser('&nbsp')} | {ReactHtmlParser('&nbsp')} <div style={{"cursor" : "pointer"}} onClick={e=>{setAuthorView(true), setTitleView(false), setTitle('')}}> Top author</div>
                    </div>
                    <div className="topList-input">
                        {
                            titleView && <input type="text" id="title" name="title" value={title} onChange={e => handleTitle(e)} placeholder=" .Search title rank" className="topList-input-searching" />
                        }
                        {
                            authorView && <input type="text" id="author" name="author" value={author} onChange={e => handleAuthor(e)} placeholder=" .Search author rank" className="topList-input-searching" />
                        }
                    </div>
                    <div className="list-songs-main">
                        <div className="topList-items">
                        {
                            titleView && title == '' ? <TopSongs /> : titleView && <Fragment>
                                
                                    {
                                        rankValues.map(song => <Fragment key={song._id}>
                                            <div className="topList-item" key={song._id}>
                                            <Link to={`/songs/${song._id}`}> {song.index}. {song.title} by {song.author} </Link>
                                            
                                            <div className="list-like-buttons">
                                            {
                                                user && song.likes.user === user._id ? <><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up list-like-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up list-like-button"> {song.likes && song.likes.length}</button>
                                            }
                                                <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                                            </div>
                                            

                                            </div>
                                        </Fragment>)
                                    }
                                
                            </Fragment>
                        }
                        {
                            authorView && author == '' ? <TopAuthors /> : <Fragment>
                                
                                    {
                                        rankAuthor.map(author => <Fragment key={author._id}>
                                            <div className="topList-item" key={author._id}>
                                            <Link to={`/authors/${author._id}`}> {author.index}. {author.author} <div className="authorSub"> <img height="15.5px" src={require('./style/author.png')}/>{author.number} </div></Link>
                                            
                                            </div>
                                        </Fragment>)
                                    }
                                
                            </Fragment>
                        }
                        </div>
                    </div>
            
                </div>
            </div>
        </Fragment>
    );
}
TopList.propTypes = {
    getSongs: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    song: state.song,
    author: state.author,
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getSongs, getAuthors, getProfiles, removeLike, addLike})(TopList)