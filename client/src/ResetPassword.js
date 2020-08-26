import React, { useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { Redirect, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { setAlert } from './actions/alert';
import { resetPassword } from './actions/auth';

const ResetPassword = ({auth: {isAuthenticated}, match, history, resetPassword}) => {

    const [formData, setFormData] = useState({
        password: '',
        repPassword: ''
    });


    const {password, repPassword} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = async e => {
        if( password !== repPassword){
            return setAlert('Passwords are not the same.')
        }
        if( password.length < 6){
            return setAlert('Password is too short. Use min: 6 signs.')
        }
        e.preventDefault();
        resetPassword(match.params.resettoken, formData);
        
        history.push('/login');
    }   

    // Redirect if user logged in
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <>
        <div className="shield">
            <div className="login-content">
                
                <label htmlFor="email" className="login-label"> Create a new password </label>
                <form onSubmit={e=>onSubmit(e)} className="auth-form" >
                <label className="log-label"><input className="log-input" type="password" name="password" value={password} placeholder=" .new password" onChange={e=>onChange(e)} /></label>
                <label className="log-label"><input className="log-input" type="password" name="repPassword" value={repPassword} placeholder=" .repeat new password" onChange={e=>onChange(e)}/></label>
                <input className="auth-button" type="submit" value="Submit" />
                </form>

            <Alert />

            </div>

        </div>
        
        
        </>
    );

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {resetPassword})(withRouter(ResetPassword));