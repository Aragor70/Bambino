import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import {updateUser} from '../actions/auth';


const AddSecret = ({setAlert, updateUser, secretView, setSecretView, user}) => {

    

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    const {name, email} = formData;

    useEffect(() => {
        setFormData({
            name: user.loading || !user.name ? '' : user.name,
            email: user.loading || !user.email ? '' : user.email
        });
    }, [user.loading]);


    const [field, setField] = useState({
        default: true,
        submit: false
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        updateUser(user._id, formData);
        setSecretView(false);
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
                            User account data
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setSecretView(!secretView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Change your name or e-mail
                        </label>
                        
                        <label className="profileLabel"><input className="profileInput" type="text" value={name} name="name" onChange={(e)=> handleChange(e)} placeholder=" .name" /></label>
                        <label className="profileLabel"><input className="profileInput" type="text" value={email} name="email" onChange={(e)=> handleChange(e)} placeholder=" .e-mail" /></label>

                        <Alert />
                        {
                            name !== '' || email !== '' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Values cannot be empty.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setSecretView(!secretView)}>Cancel</button>
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
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setSecretView(!secretView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddSecret.propTypes = {
    setAlert: PropTypes.func.isRequired,
    
}
export default connect(null, {setAlert, updateUser})(AddSecret);