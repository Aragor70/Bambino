import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import { editPassword } from '../actions/auth';


const UpdatePassword = ({setAlert, user, editPassword}) => {

    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [scrollTo])

    const [formData, setFormData] = useState({
        password: '',
        repPassword: ''
    })
    const {password, repPassword} = formData;


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== repPassword){
            return setAlert('Passwords are not the same.', 'danger')
        }

        editPassword(formData, user._id);
    }
    
    return (
        <Fragment>
                        
                <form onSubmit={e=>onSubmit(e)} style={{'width': "40%"}}>
                        
                    <label className="securityLabel"><input className="profileInput" type="password" value={password} name="password" onChange={(e)=> handleChange(e)} placeholder=" .new password" required /></label>
                    <label className="securityLabel"><input className="profileInput" type="password" value={repPassword} name="repPassword" onChange={(e)=> handleChange(e)} placeholder=" .repeat new password" required /></label>

                        <Alert />
                        <button type="button" className="security-submit" onClick={e=>setFormData({password:'', repPassword:''})} >Clear</button>
                        <button type="submit" className="security-submit" style={{'marginLeft':"15px"}}>Submit</button>
                  
                </form>
                <div className="securitLabel-info">
                    Password requires a minimum of 6 characters. <br />
                    Password requires no spaces.
                </div>
        </Fragment>
    );
}
UpdatePassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    
}
export default connect(null, {setAlert, editPassword})(UpdatePassword);