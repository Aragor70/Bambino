import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import UpdatePassword from './UpdatePassword';

const Security = ({auth:{user}, profile:{profile}}) => {
    
    return (
        <Fragment>
            <div className="content-box-settings">
                    <div className="content-settings">
                        
                        <div className="top-bar"> Password and Security </div>
                        <div className="settings-info">
                            Customize your own security panel.
                        </div>

                        <div className="top-bar"> Change password</div>
                        <div className="settings-info">
                            For security reasons, we strongly recommend that you choose a password that you do not use in any other online account.
                        </div>
                        <div className="security-content">
                        <UpdatePassword user={user} />
                        
                        </div>
                        



                        <div className="top-bar"> Two-factor authentication </div>
                        <div className="settings-info">
                            Two-factor authentication requires you to enter additional code in login process, which increase the protection of your account against unauthorized access.
                        </div>
                    </div>
                </div>
        </Fragment>
        
    );
}
Security.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(Security);