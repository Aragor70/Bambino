import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import {updateUser} from '../actions/auth';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {withRouter} from 'react-router-dom';
import {createProfile, getCurrentProfile} from '../actions/profile';
import ReactHtmlParser from 'react-html-parser';
import ProfileGithub from '../profiles/ProfileGithub';
import {getGithubRepos} from '../actions/profile';
import Moment from 'react-moment';

const AddPersonal = ({setAlert, personalView, setPersonalView, createProfile, getCurrentProfile, profile:{profile, loading}, getGithubRepos, repos}) => {


    const [formData, setFormData] = useState({
        age: null,
        gender: '',
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

    }, []);
    useEffect(() => {
        getCurrentProfile();
        getGithubRepos(githubusername);
        if(profile){
            setFormData({
                age: loading || !profile.age ? '' : profile.age,
                gender: loading || !profile.gender ? '' : profile.gender,
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
        }
        
    }, [loading]);

    const {
        age,
        gender,
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
        instagram
        } = formData;

    const [field, setField] = useState({
        default: true,
        text: false,
        github:false,
        media: false,
        submit: false
    });
    
    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, bio: data})
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData)
        setPersonalView(false);
    }
    useEffect(() => {
        if(profile){
            getGithubRepos(githubusername)
        }
        
    }, [githubusername]);
    
    
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [field])
    return (
        <Fragment>
            {
                loading ? "loading..." : <Fragment>
                <div className="songInputView" ref={scrollTo}>
                    <label className="song-label">
                        Personal data
                    </label>
                    <button type="button" className="x-top-right" onClick={e=>setPersonalView(!personalView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Change your public profile details.
                        </label>
                        
                        <label className="personalLabel"> <input className="personalInput" type="date" name="age" value={age} onChange={(e)=> handleChange(e)} /></label>
                        <label className="personalLabel"> <select className="personalInput" name="gender" value={gender} onChange={(e)=> handleChange(e)} ><option value={gender ? gender : null}>{gender ? gender : "gender"}</option><option value="male">male</option><option value="female">female</option></select></label>
                        <label className="personalLabel"> <select className="personalInput" name="status" value={status} onChange={(e)=> handleChange(e)} ><option value={status ? status : null}>{status ? status : "status"}</option><option value="single">single</option><option value="in a relationship">in a relationship</option></select></label>
                                
                        <label className="personalLabel"> <input className="personalInput" type="text" value={passion} name="passion" onChange={(e)=> handleChange(e)} placeholder=" .passion" /></label>
                        <label className="personalLabel"> <input className="personalInput" type="text" value={skills} name="skills" onChange={(e)=> handleChange(e)} placeholder=" .skills" /></label>
                        
                        {
                            age ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, text:!field.text})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Age is required value.", "danger")}}>Next -></button>
                        }

                        <button type="button" className="nextButton" onClick={e=>setPersonalView(!personalView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment>
                        <label className="song-info">
                            About me.
                        </label>
                        
                        {bio && <label className="song-text">{ReactHtmlParser(bio)}</label>}                        
                        
                        
                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>
                        
                        <Alert />
                        {
                            bio ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, github:!field.github})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text is required value.", "danger")}}>Next -></button>
                        }

                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, default:!field.default})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.github && <Fragment>
                        <label className="song-info">
                            Add github user name to display your public repository.
                        </label>
                        <label className="song-label">
                        
                        {
                            repos == null ? <div className="song-info">No repository.</div> : <Fragment>
                            {
                                repos.map(repo=> (
                                <div className="about-info" key={repo.id}><a href={repo.html_url}>{repo.name}</a> </div>))     
                            }
                            </Fragment>
                        }

                        </label>

                        <label className="personalLabel"> <input className="personalInput" type="text" name="githubusername" value={githubusername} onChange={(e)=> handleChange(e)} placeholder=" .github user" /></label>

                        <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({github:!field.github, media:!field.media})}}>Next -></button>
                        <button type="button" className="nextButton" onClick={e=>{setField({github:!field.github, text:!field.text})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.media && <Fragment>
                        <label className="song-info">
                            Web address to follow you on social media.
                        </label>
                        <label className="personalLabel"> <input className="personalInput" type="text" name="youtube" value={youtube} onChange={(e)=> handleChange(e)} placeholder=" .youtube https://..." /></label>
                        <label className="personalLabel"> <input className="personalInput" type="text" name="twitter" value={twitter} onChange={(e)=> handleChange(e)} placeholder=" .twitter https://..." /></label>
                        <label className="personalLabel"> <input className="personalInput" type="text" name="facebook" value={facebook} onChange={(e)=> handleChange(e)} placeholder=" .facebook https://..." /></label>
                        <label className="personalLabel"> <input className="personalInput" type="text" name="linkedin" value={linkedin} onChange={(e)=> handleChange(e)} placeholder=" .linkedin https://..." /></label>
                        <label className="personalLabel"> <input className="personalInput" type="text" name="instagram" value={instagram} onChange={(e)=> handleChange(e)} placeholder=" .instagram https://..." /></label>

                        <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({media:!field.media, submit:!field.submit})}}>Next -></button>
                        <button type="button" className="nextButton" onClick={e=>{setField({media:!field.media, github:!field.github})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the album.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, media:!field.media})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setPersonalView(!personalView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
                </Fragment>
            }
        </Fragment>
    );
}
AddPersonal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getGithubRepos: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    repos: state.profile.repos
});
export default connect(mapStateToProps, {setAlert, updateUser, createProfile, getCurrentProfile, getGithubRepos})(AddPersonal);