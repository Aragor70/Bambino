import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ProfileItem = ({profile:{ user:{ _id, name, avatar }, age, location, passion, status, skills, loading }}) => {

    return (
        <Fragment>
            
            <div className="profile-card">
            <Link to={`/profile/${_id}`}><img className="avatar" src={avatar} /></Link>            
            <div className="profile-label"><Link to={`/profile/${_id}`}>{name}</Link></div>
            </div>
        </Fragment>
    );
}
ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileItem;