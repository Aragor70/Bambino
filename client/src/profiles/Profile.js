import React, { Fragment, useEffect, useState } from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {getProfileById} from '../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Posts from '../posts/Posts';
import Songs from '../songs/Songs';
import Song from '../songs/Song';
import ProfilePersonal from './ProfilePersonal';
import ProfileNews from './ProfileNews';
import EditProfile from '../EditProfile';
import Post from '../posts/Post';
import Pagination from '../songs/Pagination';
import PostPagination from '../posts/PostPagination';
import ReactHtmlParser from 'react-html-parser';

import {getPosts} from '../actions/post';
import { getSongs, removeLike, addLike} from '../actions/song';
import ProfilePictures from './ProfilePictures';
import { getQuotes } from '../actions/quote';
import QuotePagination from '../quotes/QuotePagination';
import Quote from '../quotes/Quote';
import Quotes from '../quotes/Quotes';
import ProfileNav from './ProfileNav';
import { getAuthors } from '../actions/author';


const Profile = ({match, getProfileById, profile: { profile, loading }, getPosts, getSongs, getQuotes, getAuthors, author:{authors}, quote:{quotes}, post:{posts}, song:{songs}, removeLike, addLike, auth: {user}}) => {

    useEffect(() => {
        getProfileById(match.params.id)
        getPosts()
        getSongs()
        getQuotes()
        getAuthors()
    }, [getProfileById, match.params.id]);

    const [hiddenData, showData] = useState(false);

    
    const [profileNav, setProfileNav] = useState(false);

    const profileQuotes = quotes.filter(quote => quote.user == match.params.id )
    const profileSongs = songs.filter(song => song.user == match.params.id )
    const profilePosts = posts.filter(post => post.user == match.params.id )


    //liked songs

    
    const filtredSongs = songs.map(song => song.likes);
    
    let songsByUser = filtredSongs.flat(1).filter(song => song.user == match.params.id);

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


    return (
        <Fragment>
            <Router>
            {
                profile === null || loading  ? <p>loading...</p> : <Fragment>
                    <div className="shield">
                    <ProfileTop profile={profile} />
                    
                    </div>
                                        
                <Route exact path={`/profile/${profile.user._id}/songs/:id`} component={Song} />
                <Route exact path={`/profile/${profile.user._id}/posts/:id`} component={Post} />  
                <Route exact path={`/profile/${profile.user._id}/quotes/:id`} component={Quote} />
                 

                <Route exact path={`/profile/${profile.user._id}/quotes`}>
                    <div className="shield" >
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : QUOTES</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        
                    </div>
                    </div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Quotes profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    
                    </div>
                </Route>
                <Route exact path={`/profile/${match.params.id}/songs`}>
                    <div className="shield">
                        <div className="profile-mid">
                            <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : SONGS</div>
                            {
                                profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                            }
                    </div></div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Songs profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    
                    </div>
                </Route>
                <Route exact path={`/profile/${match.params.id}/pictures`}>
                    <div className="shield">
                        <div className="profile-mid">
                            <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : PICTURES</div>
                            {
                                profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                            }
                    </div></div>
                    
                        <ProfilePictures profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        
                </Route>
                <Route exact path={`/profile/${match.params.id}/community`}>
                    <div className="shield">
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : COMMUNITY</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                    </div></div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Posts profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    </div>
                </Route>
                <Route exact path={`/profile/${match.params.id}/about`}>
                    <div className="shield">
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : ABOUT</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                    </div></div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <ProfileAbout profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    </div>
                </Route>
                
                <Route exact path={`/profile/${match.params.id}`}>
            <div className="shield">
            <div className="profile-mid">
                <div className="profile-page-title" onClick={e=> setProfileNav(!profileNav)}>{profile.user.name} : MAIN</div>
                {
                    profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                }
                
            </div></div>        

            <div className="shield" onClick={e=> setProfileNav(false)}>
            <div className="main-personal-content">
            
            <div className="user-personal">
                <div className="personal-param"> Name: {profile.user.name} </div>
                
                
                    <div className="personal-button" onClick={()=>showData(!hiddenData)}>personal data <img className="expand-arrow" src={ require('../style/down.png') } /></div>
                
                    {
                        hiddenData && <Fragment>
                            <div className="personal-param"> age:{ReactHtmlParser('&nbsp')} <Moment format="YYYY-MM-DD">{profile.age}</Moment></div>
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
        <Link to={`/profile/${profile.user._id}/pictures`}> Pictures </Link>
        </div>  
    <div className="list-content">
        
        <ProfilePictures profile={profile} setProfileNav={setProfileNav} profileNav={profileNav} pictureLimit='5' official={true} />
        
    </div>
    <div className="pop-category">
        <Link to={`/profile/${profile.user._id}/quotes`}> Quotes </Link>
            {
                profileQuotes.length > 2 && <button type="button" className="more-btn"><Link to={`/profile/${profile.user._id}/quotes`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">
        
        <QuotePagination user={profile.user} quotes={quotes} label="Quotes" labelUrl="quotes" quotesLimitPerPage="2" />
    </div>
    <div className="pop-category">
        <Link to={`/profile/${profile.user._id}/community`}> Community </Link>
            {
                profilePosts.length > 5 && <button type="button" className="more-btn"><Link to={`/profile/${profile.user._id}/community`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">

        <PostPagination user={profile.user} posts={posts} label="Posts" labelUrl="posts" postsLimitPerPage="5" numbers={false} />

    </div>
    
    <div className="pop-category">
        Favorite song titles
    </div>
    <div className="list-content">
        {
            songs == null ? <div className="song-label">loading...</div> : <div className="song-label">
            {filtredFour.map(song => <Fragment key={song._id}>
                
                <div className="song-info" key={song._id}><Link to={`/profile/${profile.user._id}/songs/${song._id}`}>{song.author} - {song.title} </Link>
                <div className="song-list-buttons">
                {
                    profile.user && song.likes.user === profile.user._id ? <><div className="liked"></div><button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button></> : <button onClick={e=> addLike(song._id)} className="fa fa-thumbs-up song-list-button"> {song.likes && song.likes.length}</button>
                }
                    <button onClick={e=> removeLike(song._id)} className="fa fa-thumbs-down song-button"></button>
                </div>
                </div>
                
            </Fragment>)}
            
            </div>
        }
        
    </div>

    <div className="pop-category">
        <Link to={`/profile/${profile.user._id}/songs`}> Song titles uploaded by {profile.user.name} </Link>
            {
                profileSongs.length > 5 && <button type="button" className="more-btn"><Link to={`/profile/${profile.user._id}/songs`}>Check more !</Link></button>
            }
        </div> 
    <div className="list-content">
        
        <Pagination user={profile.user} songs={songs} removeLike={removeLike} addLike={addLike} label="Songs" labelUrl="songs" songsLimitPerPage="5" numbers={false} />
        
    
    </div>
        </div>
        </div>
        </div>       
                </Route>

                </Fragment>
            }
            </Router>
        </Fragment>
    );
}
Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
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
export default connect(mapStateToProps, {getProfileById, getPosts, getSongs, getQuotes, getAuthors, removeLike, addLike})(Profile);