import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ProfileNav = ({profile, profileNav, setProfileNav}) => {



    return (
        <Fragment>

            <div className="profile-nav">
                
            <Link to={`/profile`}><div className="nav" onClick={e => setProfileNav(!profileNav)}>Main</div></Link>
            <Link to={`/profile/${profile.user._id}/songs`}><div className="nav" onClick={e => setProfileNav(!profileNav)}>Songs</div></Link>
            <Link to={`/profile/${profile.user._id}/pictures`}><div className="nav" onClick={e => setProfileNav(!profileNav)}>Pictures</div></Link>
            <Link to={`/profile/${profile.user._id}/community`}><div className="nav" onClick={e => setProfileNav(!profileNav)}>Community</div></Link>
            <Link to={`/profile/${profile.user._id}/about`}><div className="nav" onClick={e => setProfileNav(!profileNav)}>About</div></Link>
                
            </div>

        </Fragment>
    );
}
export default ProfileNav;