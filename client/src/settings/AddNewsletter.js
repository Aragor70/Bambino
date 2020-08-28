import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import {addNewsletter} from '../actions/newsletter';


const AddNewsletter = ({currentEmail, setAlert, addNewsletter, newsletterView, setNewsletterView, user}) => {

    

    const [formData, setFormData] = useState({
        email: ''
    })
    const {email} = formData;

    useEffect(() => {
        if(currentEmail !== null){
            setFormData({email: currentEmail})
        }
    }, []);

    const [field, setField] = useState({
        default: true,
        submit: false
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        addNewsletter(formData);
        setNewsletterView(false);
    }
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [field])
    return (
        <Fragment>
            <div className="songInputView" ref={scrollTo}>
                        <label className="song-label">
                            Newsletter
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setNewsletterView(!newsletterView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        <label className="song-info">
                            Profile e-mail address <div onClick={e=>setFormData({email: user.email})}>{": "+user.email}</div> ?
                        </label>
                        
                        <label className="profileLabel"><input className="profileInput" type="text" value={email} name="email" onChange={(e)=> handleChange(e)} placeholder=" .e-mail" /></label>

                        <Alert />
                        {
                            email !== '' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("E-mail cannot be empty.", "danger")}}>Next -></button>
                        }

                        <button type="button" className="nextButton" onClick={e=>setNewsletterView(!newsletterView)}>Cancel</button>
                        <button type="button" className="nextButton" onClick={e=>setFormData({email: ''})}>Reset</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the form.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setNewsletterView(!newsletterView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddNewsletter.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addNewsletter: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(null, {setAlert, addNewsletter})(AddNewsletter);