import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import AvatarScreen from './AvatarScreen';

const ProfileTop = ({profile}) => {

    const [pictureScreen, setPictureScreen] = useState(false)
    const [pictureContent, setPictureContent] = useState({
        fileName: profile.user.avatar
    })

    return (
        <Fragment>
            <div className="account-nav-content"> 
            <div className="profile-top">
                
                <Link to={`/profile/${profile.user._id}`}><div className="nav">Main</div></Link><Link to={`/profile/${profile.user._id}/songs`}><div className="nav">Songs</div></Link><Link to={`/profile/${profile.user._id}/pictures`}><div className="nav">Pictures</div></Link><Link to ={`/profile/${profile.user._id}/community`}><div className="nav">Community</div></Link><Link to ={`/profile/${profile.user._id}/about`}><div className="nav">About</div></Link>
                
            </div>
            <div className="avatarField" >{profile && profile.user.avatar.charAt(0) == "/" ? <img onClick={e=>setPictureScreen(!pictureScreen)} src={profile.user.avatar} /> : <img onClick={e=>setPictureScreen(!pictureScreen)} src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${profile.user.avatar}`} />}</div>
            {
                pictureScreen && <AvatarScreen pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
            }
            {
                pictureScreen && <div className="addshadow" onClick={e=>setPictureScreen(false)}></div>
            }
            </div>
        </Fragment>
    )
}
ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileTop;