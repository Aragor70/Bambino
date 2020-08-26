import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {removeComment, getSongs} from '../actions/song';
import PropTypes from 'prop-types';
import {deleteAccount} from '../actions/profile';
import AddSecret from '../settings/AddSecret';
import AddPersonal from '../settings/AddPersonal';
import AddNewsletter from '../settings/AddNewsletter';
import { getNewsletter } from '../actions/newsletter';
import Alert from '../Alert';
import AddImage from './AddImage';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateProfile from '../CreateProfile';

const General = ({deleteAccount, user, profile, getNewsletter, currentEmail, setPersonalView, personalView}) => {

    const [imageView, setImageView] = useState(false);
    const [secretView, setSecretView] = useState(false);
    const [newsletterView, setNewsletterView] = useState(false);

    return (
        <Fragment>
            <div className="content-box-settings">
                    <div className="content-settings">
                    <Alert/>
                        <div className="top-bar"> General settings </div>
                        <div className="settings-info">
                            Customize your web profile.
                        </div>
                        <div className="settings-info">
                            You can change profile name, contact information and much more.
                        </div>
                        <div className="top-bar" >Account Info <img className="add-mrg-left" src={ require('../style/edit.png') } height="24px" onClick={e=> setSecretView(!secretView)} /></div>
                        
                        <div className="settings-info">
                            User ID:  
                        </div><div className="settings-info">{user._id}</div>
                        <div className="settings-info">
                            Name: {user.name}
                        </div>
                        <div className="settings-info">
                            E-mail: {user.email}
                        </div>
                        {
                            secretView && <Fragment><AddSecret secretView={secretView} setSecretView={setSecretView} user={user} /></Fragment>
                        }
                        {
                            secretView && <div className="addshadow"></div>
                        }

                        <div className="top-bar" >Profile avatar <img className="add-mrg-left" src={ require('../style/edit.png') } height="24px" onClick={e=> setImageView(!imageView)} /></div>
                        <div className="settings-info">
                            Choose the image that represents your public profile.
                        </div>
                        {
                            imageView && <Fragment><AddImage imageView={imageView} setImageView={setImageView} user={user} /></Fragment>
                        }
                        {
                            imageView && <div className="addshadow"></div>
                        }
                
                    <div className="top-bar"> Personal Data <img className="add-mrg-left" src={ require('../style/edit.png') } height="24px" onClick={e=>setPersonalView(!personalView)} /></div>
                        <div className="settings-info">
                            Manage your personal data and contact information. Read our privacy policy.
                        </div>
                        
                        <div className="top-bar"> Newsletter <img className="add-mrg-left" src={ require('../style/edit.png') } height="24px" onClick={e=>setNewsletterView(!newsletterView)} /> {currentEmail[0] && <img className="add-mrg-left" src={ require('../style/tick.png') } height="24px" style={{"cursor":"auto"}} />}</div>
                        <div className="settings-info">
                            Receive latest free news, quick tips, and the popular music trends in newsletters.
                        </div>
                        {
                            currentEmail[0] !== null && <Fragment>
                                <div className="settings-info">
                                    Your e-mail address already exists.
                                </div>
                                <div className="settings-info">
                                    {currentEmail[0]}
                                </div>
                            </Fragment>
                        }
                        


                        
                        {
                            newsletterView && <Fragment><AddNewsletter user={user} newsletterView={newsletterView} setNewsletterView={setNewsletterView} currentEmail={currentEmail[0]}  /></Fragment>
                        }
                        {
                            newsletterView && <div className="addshadow"></div>
                        }
                        <div className="top-bar"> Delete Account <img className="add-mrg-left" src={ require('../style/cross.png') } height="24px" onClick={()=>deleteAccount()} /></div>
                        <div className="settings-info">
                            Process of permamently deleting your Account including all progress and content.
                        </div>
                    </div>
                </div>
        </Fragment>
        
    );
}
General.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getNewsletter: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    newsletter: state.newsletter
})
export default connect(mapStateToProps, { deleteAccount, getNewsletter })(General);