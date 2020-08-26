import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {createProfile, getCurrentProfile} from './actions/profile';
import Alert from './Alert';

const EditProfile = ({getCurrentProfile, auth: {user}, profile:{profile, loading}, createProfile, history}) => {
    const [displayToggleInputs, toggleInputs] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        location: '',
        passion: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            age: loading || !profile.age ? '' : profile.age,
            location: loading || !profile.location ? '' : profile.location,
            passion: loading || !profile.passion ? '' : profile.passion,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            bio: loading || !profile.bio ? '' : profile.bio,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
            linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram
        });
    },[loading]);

    const {
    age,
    location,
    passion,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <>
            <div className="shield">
            <div className="profile-edit"> 
            
            <p className="visit-param"><Link to='/account'> <img className="arrow-back" src={ require('./style/arrow_left.png') } /> </Link>Edit profile</p>

            <form onSubmit={e=> onSubmit(e)}>
                
            <div className="disabled"><label className="profileLabel"><input className="profileInput" type="text" name="name" value={user.name} disabled onChange={(e)=> handleChange(e)} placeholder=" .age [DD-MM-YYYY]" /></label></div>
            <div className="disabled"><label className="profileLabel"><input className="profileInput" type="text" name="email" value={user.email} disabled onChange={(e)=> handleChange(e)} /></label></div>
                
                <label className="profileDateLabel"><input className="profileDate" type="date" name="age" value={age} onChange={(e)=> handleChange(e)} placeholder=" .age [DD-MM-YYYY]" /></label>
                <label className="profileSelectLabel"><select className="profileSelect" name="status" value={status} onChange={(e)=> handleChange(e)} ><option>status</option><option value="single">single</option><option value="in a relationship">in a relationship</option></select></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="location" value={location} onChange={(e)=> handleChange(e)} placeholder=" .city" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="passion" value={passion} onChange={(e)=> handleChange(e)} placeholder=" .passion" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="skills" value={skills} onChange={(e)=> handleChange(e)} placeholder=" .skills" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileTextAreaLabel"><textarea className="profileTextArea" name="bio" value={bio} onChange={(e)=> handleChange(e)} placeholder=" .about me" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                
                <div onClick={()=>toggleInputs(!displayToggleInputs)} className="social-btn">{!displayToggleInputs ? ("Add social network website address") : ("Hide social network website address")} <img className="editImage" src={ require('./style/add.png') } /> </div>
                {displayToggleInputs && <Fragment>
                    <label className="profileLabel"><input className="profileInput" type="text" name="githubusername" value={githubusername} onChange={(e)=> handleChange(e)} placeholder=" .github user name" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    <label className="profileLabel"><input className="profileInput" type="text" name="youtube" value={youtube} onChange={(e)=> handleChange(e)} placeholder=" .youtube url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    <label className="profileLabel"><input className="profileInput" type="text" name="twitter" value={twitter} onChange={(e)=> handleChange(e)} placeholder=" .twitter url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    <label className="profileLabel"><input className="profileInput" type="text" name="facebook" value={facebook} onChange={(e)=> handleChange(e)} placeholder=" .facebook url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    <label className="profileLabel"><input className="profileInput" type="text" name="linkedin" value={linkedin} onChange={(e)=> handleChange(e)} placeholder=" .linkedin url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    <label className="profileLabel"><input className="profileInput" type="text" name="instagram" value={instagram} onChange={(e)=> handleChange(e)} placeholder=" .instagram url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                    
                </Fragment>
                }
                <input className="formBtn" type="submit" value="Save" />
            </form>
            </div>
            <Alert />
            </div>
        </>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));