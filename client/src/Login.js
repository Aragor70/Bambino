import React, { useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from './actions/auth';
import Alert from './Alert';
import { Redirect, BrowserRouter as Router, withRouter, Link } from 'react-router-dom';

const Login = ({login, auth: {isAuthenticated}, history}) => {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formState;

    const onChange = e => {
        setFormState({...formState, [e.target.name] : e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        await login(email, password, history);
       
    }   

    // Redirect if user logged in
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <>
        <div className="shield">
            <div className="login-content">
                
                <label htmlFor="email" className="login-label"> Log in </label>
                <form onSubmit={e=>onSubmit(e)} className="auth-form" >
                <label className="log-label"><input className="log-input" type="text" name="email" value={email} placeholder=" .e-mail" onChange={e=>onChange(e)} /></label>
                <label className="log-label"><input className="log-input" type="password" name="password" value={password} placeholder=" .password" onChange={e=>onChange(e)} /></label>
                
                <input className="auth-button" type="submit" value="log in" />
                <div className="log-label"> <Link to="/forgotpassword">Forgot your password?</Link> </div>
                </form>

            <Alert />

            </div>

        </div>
        
        
        </>
    );

}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(withRouter(Login));