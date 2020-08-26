import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import {deleteAccount} from './actions/profile';
import PropTypes from 'prop-types';
import {Link, BrowserRouter as Router, Switch} from 'react-router-dom';

const Settings = ({auth:{user}, profile:{profile}, deleteAccount}) => {

    return (
        <Fragment>
            <div className="settings">
                <p className="personal-param">Profile</p>
                <div className="setting-box">
                <label className="profileLabel"><input className="profileInput" type="text" name="name" value={user.name} disabled onChange={(e)=> handleChange(e)} placeholder=" .age [DD-MM-YYYY]" /><img className="editImage" src={ require('./style/edit.png') } /></label>
            <label className="profileLabel"><input className="profileInput" type="text" name="email" value={user.email} disabled onChange={(e)=> handleChange(e)} /><img className="editImage" src={ require('./style/edit.png') } /></label>
                </div>
                <p className="personal-param">System</p>
                <div className="setting-box">
                    <Router>
                        <Switch>
                    <Link to="/account_settings"> Edit Profile </Link>
                    </Switch>
                    </Router>
                    <p className="profileLabel"> Delete account: <button onClick={()=>deleteAccount()} className="delete-button">X</button> </p>
                </div>
                <p className="personal-param">View</p>
                <div className="setting-box">
                    <p className="profileLabel">language: <select><option>English</option></select></p>
                    <p className="profileLabel">font family:<select><option>Default</option></select></p>
                    <p className="profileLabel">background color:<select><option>Default</option></select></p>
                        
                    
                </div>
                

            </div>
        </Fragment>
    )
}
Settings.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
export default connect(mapStateToProps, {deleteAccount})(Settings);