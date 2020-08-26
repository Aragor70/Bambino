import React, { useEffect, Fragment, useState } from 'react';
import {Link, Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {getCurrentProfile} from './actions/profile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Profile from './Profile';
import PrivateRoute from './routing/PrivateRoute';
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
import NoProfile from './NoProfile';

import Song from './songs/Song';

import Songs from './songs/Songs';
import Posts from './posts/Posts';
import ProfileAbout from './profiles/ProfileAbout';
import Control from './Control';

import Quote from './Quote';
import Post from './posts/Post';
import AddImage from './settings/AddImage';
import ProfilePictures from './profiles/ProfilePictures';
import AddPicture from './profiles/AddPicture';
import ProfileAdd from './profiles/ProfileAdd';

import AddAuthor from './songs/AddAuthor';
import AddPost from './posts/AddPost';
import ProfileNav from './profiles/ProfileNav';
import AvatarScreen from './profiles/AvatarScreen';
import Quotes from './quotes/Quotes';

const Account = ({getCurrentProfile, auth: {user}, profile: {profile, loading}}) => {

    useEffect(()=> {
        getCurrentProfile()
    }, [loading]);

    const [imageView, setImageView] = useState(false);

    const [pictureView, setPictureView] = useState(false);

    const [profileAdd, setProfileAdd] = useState(false);

    const [postInputView, setPostInputView] = useState(false);
    const [songInputView, setSongInputView] = useState(false);
    const [authorInputView, setAuthorInputView] = useState(false);

    const [profileNav, setProfileNav] = useState(false);
    
    const [pictureScreen, setPictureScreen] = useState(false)
    const [pictureContent, setPictureContent] = useState({
        fileName: user.avatar
    })

    return (
        user && loading ? <div>loading...</div> : <Fragment>
            <Router>
            {profile ? 
              <Fragment>

                  <div className="shield" onClick={e=> setProfileNav(false)}>
                  
                  <div className="account-nav-content"> 
                    
            <div className="profile-top">
                
                <Link to={`/profile`}><div className="nav">Main</div></Link><Link to={`/profile/${user._id}/songs`}><div className="nav">Songs</div></Link><Link to={`/profile/${user._id}/pictures`}><div className="nav">Pictures</div></Link><Link to ={`/profile/${user._id}/community`}><div className="nav">Community</div></Link><Link to ={`/profile/${user._id}/about`}><div className="nav">About</div></Link>
                
            </div>
            <div className="avatarField" ><Fragment><div className="avatar-update"><img onClick={e=> setPictureScreen(!pictureScreen)} src={require("./style/uploadPhoto.png")} height="24px" onClick={e=>setImageView(!imageView)} /></div>{user && user.avatar.charAt(0) == "/" ? <img onClick={e=> setPictureScreen(!pictureScreen)} src={user.avatar} height="100%" /> : <img onClick={e=> setPictureScreen(!pictureScreen)} src={require(`../uploads/avatar/${user.avatar}`)} height="100%" />}</Fragment></div>
            {
                pictureScreen && <AvatarScreen pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
            }
            {
                pictureScreen && <div className="addshadow" onClick={e=>setPictureScreen(false)}></div>
            }
            </div></div>

                
                <Switch>
                <PrivateRoute exact path="/profile" >

                    <Profile profileNav={profileNav} setProfileNav={setProfileNav} />
                

                </PrivateRoute>
                {
                    imageView && <Fragment><AddImage imageView={imageView} setImageView={setImageView} user={user} /></Fragment>
                }
                {
                    imageView && <div className="addshadow"></div>
                }
                {
                    postInputView && <AddPost postInputView={postInputView} setPostInputView={setPostInputView}  />
                }
                {
                    postInputView && <div className="addshadow"></div>
                }
                {
                    pictureView && <AddPicture pictureView={pictureView} setPictureView={setPictureView} />
                }
                {
                    pictureView && <div className="addshadow"></div>
                }

                
                <Route exact path={`/profile/${user._id}/songs/:id`} component={Song} />
                <Route exact path={`/profile/${user._id}/posts/:id`} component={Post} />
                <Route exact path={`/profile/${user._id}/quotes/:id`} component={Quote} />

                <Route exact path={`/profile/${user._id}/quotes`}>
                    <div className="shield" >
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} >{user.name} : QUOTES</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        
                    </div>
                    </div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Quotes profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    
                    </div>
                </Route>
                <Route exact path={`/profile/${user._id}/songs`}>
                    <div className="shield" >
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} >{user.name} : SONGS</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        
                    </div>
                    </div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Songs profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    
                    </div>
                </Route>
                <Route exact path={`/profile/${user._id}/pictures`}>
                    <div className="shield">
                    <div className="profile-mid">
                    <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} >{user.name} : PICTURES</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        <button id="profile-addSong-button" onClick={e => {setPictureView(!pictureView), setProfileNav(false)}}><img src={require('./style/plus.png')} /></button>
                    
                    </div>
                    </div>
                    <ProfilePictures profile={profile} setProfileNav={setProfileNav} profileNav={profileNav} />
                    
                </Route>
                <Route exact path={`/profile/${user._id}/community`}>
                    <div className="shield">
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} > {user.name} : COMMUNITY </div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        <button id="profile-addSong-button" onClick={e=>{setPostInputView(!postInputView), setProfileNav(false)}} ><img src={require('./style/plus.png')} /></button>
                    </div>
                    </div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <Posts profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    </div>
                </Route>
                <Route exact path={`/profile/${user._id}/about`}>
                    <div className="shield">
                    <div className="profile-mid">
                        <div className="profile-page-title" onClick={e => setProfileNav(!profileNav)} >{user.name} : ABOUT</div>
                        {
                            profileNav && <ProfileNav profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                        }
                        
                    </div>
                    </div>
                    <div className="shield" onClick={e=> setProfileNav(false)}>
                    <ProfileAbout profile={profile} profileNav={profileNav} setProfileNav={setProfileNav} />
                    </div>
                </Route>
                </Switch>
                        
                        
              </Fragment>
            : <Fragment>
                <Switch>
                    <Route exact path="/profile">
                        <div className="shield">
                            <NoProfile />
                        </div>
                        
                    </Route>
                    <Route exact path="/profile_create" component={CreateProfile} />
                </Switch>
            
        </Fragment>}
        </Router>
        </Fragment>

    )
}
Account.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getCurrentProfile})(Account);