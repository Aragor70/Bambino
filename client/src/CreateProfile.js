import React, { useState, Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {createProfile} from './actions/profile';
import Alert from './Alert';

const CreateProfile = ({createProfile, history, auth: {user}}) => {
    
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
        createProfile(formData, history)
    }
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        }
    }, [displayToggleInputs])

    return (
        <>
            
            <div className="profile-create">
            
            <p className="visit-param">Create your profile</p>

            <form onSubmit={e=> onSubmit(e)}>
            <label className="profileLabel"><input className="profileInput" type="text" name="name" value={user.name} disabled onChange={(e)=> handleChange(e)} placeholder=" .age [DD-MM-YYYY]" /><img className="editImage" src={ require('./style/edit.png') } /></label>
            <label className="profileLabel"><input className="profileInput" type="text" name="email" value={user.email} disabled onChange={(e)=> handleChange(e)} /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileDateLabel"><input className="profileDate" type="date" name="age" value={age} onChange={(e)=> handleChange(e)} placeholder=" .age [DD-MM-YYYY]" /></label>
                <label className="profileSelectLabel"><select className="profileSelect" name="status" value={status} onChange={(e)=> handleChange(e)} ><option>status</option><option value="single">single</option><option value="in a relationship">in a relationship</option></select></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="location" value={location} onChange={(e)=> handleChange(e)} placeholder=" .city" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="passion" value={passion} onChange={(e)=> handleChange(e)} placeholder=" .passion" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileLabel"><input className="profileInput" type="text" name="skills" value={skills} onChange={(e)=> handleChange(e)} placeholder=" .skills" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                <label className="profileTextAreaLabel"><textarea className="profileTextArea" name="bio" value={bio} onChange={(e)=> handleChange(e)} placeholder=" .about me" /><img className="editImage" src={ require('./style/edit.png') } /></label>
                
                <div onClick={()=>toggleInputs(!displayToggleInputs)} className="social-btn" ref={scrollTo}>Social network website address <img className="editImage" src={ require('./style/add.png') } /> </div>
                {displayToggleInputs && <Fragment>
                    <label className="profileLabel"><input className="profileInput" type="text" name="githubusername" value={githubusername} onChange={(e)=> handleChange(e)} placeholder=" .github url" /><img className="editImage" src={ require('./style/edit.png') } /></label>
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
        </>
    )
}

CreateProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));