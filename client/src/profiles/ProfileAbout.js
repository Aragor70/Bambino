import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileGithub from './ProfileGithub';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';


const ProfileAbout = ({ profile }) => {

    return (
        profile &&
        <Fragment>
            
            <div className="about-content">
                <div className="about-main">
                            <div className="about-label"> Description
                            <div className="about-info">{ReactHtmlParser(profile.bio)}</div>
                            </div>
                
                            <div className="about-label"> Details </div>
                
                    <tr className="about-info">
                    
                    <td>name:</td><td>{profile.user.name}</td>
                    
                    </tr>
                    <tr className="about-info">
                    
                    <td>birthday:</td><td>{profile.age ? <Moment format="YYYY-MM-DD">{profile.age}</Moment> : "None"}</td>
                    
                    </tr>
                    <tr className="about-info">
                    
                    <td>status:</td><td>{profile.status ? profile.status : "None"}</td>
                    
                    </tr>
                    <tr className="about-info">
                    
                    <td>location:</td><td>{profile.location ? profile.location : "None"}</td>
                    
                    </tr>
                    <tr className="about-info">
                    
                    <td>passion:</td><td>{profile.passion ? profile.passion : "None"}</td>
                    
                    </tr>
                </div>
                    {
                        profile.social && <Fragment>
                    <div className="about-other">
                    {
                        profile.social && <Fragment> 
                            <div className="social-label"> Follow me on:
                                 {profile.social[0].youtube && <div className="about-info"><a href={profile.social[0].youtube}> youtube </a> </div>} 
                                 {profile.social[0].twitter && <div className="about-info"><a href={profile.social[0].twitter}>twitter </a> </div>} 
                                 {profile.social[0].facebook && <div className="about-info"><a href={profile.social[0].facebook}>facebook </a> </div>}
                                 {profile.social[0].linkedin && <div className="about-info"><a href={profile.social[0].linkedin}>linkedin </a> </div>}
                                 {profile.social[0].instagram && <div className="about-info"><a href={profile.social[0].instagram}>instagram </a> </div>} 

                            </div>
                        </Fragment>
                    }
                    {
                        profile.githubusername && <Fragment>
                            <ProfileGithub username={profile.githubusername} />
                        </Fragment>
                    }
                    </div>
                        </Fragment>
                    }
                    
            </div>
        </Fragment>
    );
}
ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileAbout;