import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Router} from 'react-router-dom';
import Moment from 'react-moment';
import CreateQuote from './CreateQuote';
import CreateRecommendation from './CreateRecommendation';
import Quote from './Quote';
import Recommendation from './Recommendation';
import PrivateRoute from './routing/PrivateRoute';
import EditProfile from './EditProfile';
import Post from './posts/Post';
import ReactHtmlParser from 'react-html-parser';

import Pagination from './songs/Pagination';
import PostPagination from './posts/PostPagination';
import ToggleSocial from './profiles/ToggleSocial';
import ProfileNav from './profiles/ProfileNav';

import {getPosts} from './actions/post';
import { getSongs, removeLike, addLike} from './actions/song';
import QuotePagination from './quotes/QuotePagination';
import { getQuotes } from './actions/quote';
import ProfilePictures from './profiles/ProfilePictures';
import FavoriteSong from './userAccount/FavoriteSong';
import { getAuthors } from './actions/author';

const Profile = ({auth: {user, loading}, profile:{profile}, getSongs, getPosts, getQuotes, getAuthors, author:{authors}, quote:{quotes}, post:{posts}, song:{songs}, removeLike, addLike, profileAdd, setProfileAdd, profileNav, setProfileNav}) => {

    useEffect(()=>{
        getPosts()
        getSongs()
        getQuotes()
        getAuthors()
    }, []);

    //liked songs
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

    songsByUser.sort(compareFunction);
    
    const sliced4 = songsByUser.slice(0, 4);

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
    
    const filtredFour = []
    sliced4.filter(function (oldData){
        return songs.filter(function (newData){
            if(newData._id == oldData.song){
                filtredFour.push(newData)
            }
        })
    })
    const totalSongs = filtredFour.length;
    const lastPageNumber = totalSongs / 5;
    
    const pageNumbers = []

    for(let i = 1; i < lastPageNumber + 1; i++){
        pageNumbers.push(i)
    }


    const [hiddenData, showData] = useState(false);
    const [hiddenQuote, showQuote] = useState(false);
    const [hiddenRecomm, showRecomm] = useState(false);

    const [hiddenCreateQuote, showCreateQuote] = useState(false);
    const [hiddenCreateRecomm, showCreateRecomm] = useState(false);
    useEffect(() => {
        if((hiddenQuote == true)|| (hiddenRecomm == true)){
            document.body.classList.add('showfeature');
        }
        else{
            document.body.classList.remove('showfeature');
        }
        
        if(hiddenCreateRecomm == true){
            document.body.classList.add('showCreateRecomm');
        }
        else{
            document.body.classList.remove('showCreateRecomm');
        }

        if(hiddenCreateQuote == true){
            document.body.classList.add('showCreateQuote');
        }
        else{
            document.body.classList.remove('showCreateQuote');
        }
    },[hiddenQuote, hiddenRecomm, hiddenCreateQuote, hiddenCreateRecomm]);
    
    const profileQuotes = quotes.filter(quote => quote.user == user._id)
    const profileSongs = songs.filter(song => song.user == user._id)
    const profilePosts = posts.filter(post => post.user == user._id)


    return (
        <Fragment>

        
            {
            profile && <Fragment>
                <div className="shield">
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} >{user.name} : MAIN</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                    </div>
                </div>

                <div className="shield" onClick={e=> setProfileNav(false)}>
                <div className="main-personal-content">
            
            <div className="user-personal">
                <div className="personal-param"> Name: {user.name} </div>
                <div className="personal-param"> E-mail: {user.email} </div>
                
                <div className="personal-button" onClick={()=>showData(!hiddenData)}>personal data <img className="expand-arrow" src={ require('./style/down.png') } /></div>
                
                {
                    hiddenData && <Fragment>
                        <div className="personal-param"> age:{ReactHtmlParser('&nbsp')} <Moment format="YYYY-DD-MM">{profile.age}</Moment></div>
                        <div className="personal-param"> location: {profile.location} </div>
                        <div className="personal-param"> passion: {profile.passion} </div>
                        <div className="personal-param"> status: {profile.status} </div>
                        <div className="personal-param"> skills: {profile.skills} </div>
                        <div className="personal-social">
                            
                            {
                                profile.social && <Fragment>
                                    {profile.social.youtube && <div className="social-button fyt"> <a href={profile.social.youtube}> yt </a></div>}
                                    {profile.social.twitter && <div className="social-button ftw"> <a href={profile.social.twitter}> tw </a></div>}
                                    {profile.social.facebook && <div className="social-button ffb"> <a href={profile.social.facebook}> fb </a></div>}
                                    {profile.social.linkedin && <div className="social-button flk"> <a href={profile.social.linkedin}> lk </a></div>}
                                    {profile.social.instagram && <div className="social-button fin"> <a href={profile.social.instagram}> in </a></div>}
                                </Fragment>
                            }
                        </div>
                    </Fragment>
                }
                <hr/>
            </div>
            <div className="list-contents">
        <div className="pop-category">
            Pictures
        </div>  
    <div className="list-content">
              
        <ProfilePictures profile={profile} setProfileNav={setProfileNav} profileNav={profileNav} pictureLimit='5' official={true} />
        
    </div>
        <div className="pop-category">
            Quotes
            {
                profileQuotes.length > 2 && <button type="button" className="more-btn"><Link to={`/profile/${user._id}/quotes`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">
        
        <QuotePagination user={user} quotes={quotes} label="Quotes" labelUrl="quotes" quotesLimitPerPage="2" />
    </div>
        <div className="pop-category">
            Community
            {
                profilePosts.length > 5 && <button type="button" className="more-btn"><Link to={`/profile/${user._id}/community`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">
        
        <PostPagination user={user} posts={posts} label="Posts" labelUrl="posts" postsLimitPerPage="5"  />

    </div>
        <div className="pop-category">
            Favorite titles
        </div>
        <div className="list-content">
        {
            songs == null ? <div className="song-label">loading...</div> : <div className="song-label">
            {filtredFour.map(song => <Fragment key={song._id}>
                
                <div className="song-info" key={song._id}><Link to={`/profile/${user._id}/songs/${song._id}`}>{song.author} - {song.title} </Link>
                <div className="song-list-buttons">
                {
                    user && song.likes.user === user._id ? <><div className="liked"></div><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button>
                }
                    <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                </div>
                </div>
                
            </Fragment>)}
            {
                songs && pageNumbers.length > 0 && <Fragment>
                    <div className="pageNumbers">
                    {
                    pageNumbers.map(number=><div className="pageNumber" onClick={e=>setCurrentPage(number)}> {number} </div>)
                    }
                    </div>
                </Fragment>
            }
            
            </div>
        }
        
        </div>
        <div className="pop-category">
            Titles uploaded by {user.name}
            {
                profileSongs.length > 5 && <button type="button" className="more-btn"><Link to={`/profile/${user._id}/songs`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">
        
        <Pagination user={user} songs={songs} removeLike={removeLike} addLike={addLike} label="Songs" labelUrl="songs" songsLimitPerPage="5" />
        
    </div>
    
        </div>
        </div>
                
                

                <Recommendation hiddenRecomm={hiddenRecomm} showRecomm={showRecomm} />
                <Quote hiddenQuote={hiddenQuote} showQuote={showQuote} />
                <CreateQuote hiddenQuote={hiddenCreateQuote} showQuote={showQuote} />
                <CreateRecommendation hiddenRecomm={hiddenCreateRecomm} showCreateRecomm={showCreateRecomm} />
                
                
                
                </div>
            </Fragment>
            }
            
        
  
              
        </Fragment>
    )
}
Profile.propTypes = {
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post,
    song: state.song,
    quote: state.quote,
    author: state.author
})

export default connect(mapStateToProps, {getPosts, getSongs, getQuotes, removeLike, addLike, getAuthors})(Profile);