import React, { useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from './actions/alert';
import {register} from './actions/auth';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { Redirect, withRouter } from 'react-router-dom';

const Register = ({setAlert, register, isAuthenticated, history}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repPassword: ""
    });
    const {name, email, password, repPassword} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password!==repPassword){
            setAlert('Password do not match', 'danger');
        }
        else{
            register({name, email, password});
            if(isAuthenticated)history.push('/')
        }
    }
    // Redirect after registration
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <>
            <div className="shield">
            <div className="login-content">
            
            <label htmlFor="name" className="login-label">Registration - Create your account</label>

            <form className="auth-form" onSubmit={e=>onSubmit(e)} >
                <label className="log-label"><input className="log-input" type="text" name="name" value={name} placeholder=" .name" onChange={e=>onChange(e)} /></label><br/>
                <label className="log-label"><input className="log-input" type="text" name="email" value={email} placeholder=" .e-mail" onChange={e=>onChange(e)} /></label><br/>
                <label className="log-label"><input className="log-input" type="password" name="password" value={password} placeholder=" .password" onChange={e=>onChange(e)}/></label><br/>
                <label className="log-label"><input className="log-input" type="password" name="repPassword" value={repPassword} placeholder=" .repeat password" onChange={e=>onChange(e)}/></label><br/>
                <input className="auth-button" type="submit" value="register"/>
            </form>

            <Alert />
            </div>
            </div>
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(withRouter(Register));