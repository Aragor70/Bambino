import React, { useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { Redirect, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { setAlert } from './actions/alert';
import { forgotPassword } from './actions/auth';

const ForgotPassword = ({auth: {isAuthenticated}, history, forgotPassword}) => {

    const [formData, setFormData] = useState({
        email: ''
    });



    const {email} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const onSubmit = async e => {
        
        e.preventDefault();
        forgotPassword(formData);
        history.push('/');
    }   

    // Redirect if user logged in
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <>
        <div className="shield">
            <div className="login-content">
                
                <label htmlFor="email" className="login-label" style={{'justifyContent': 'center', 'padding': '0'}}> Send email to reset a password </label>
                <form onSubmit={e=>onSubmit(e)} className="auth-form" >
                <label className="log-label"><input className="log-input" type="text" name="email" value={email} placeholder=" .e-mail address" onChange={e=>onChange(e)} /></label>
                
                <input className="auth-button" type="submit" value="Send email" />
                </form>

            <Alert />

            </div>

        </div>
        
        
        </>
    );

}
ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {forgotPassword})(withRouter(ForgotPassword));