import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const Connections = ({ auth:{user}, profile:{profile} }) => {
    
    return (
        <Fragment>
            <div className="content-box-settings">
                    <div className="content-settings">
                        
                        <div className="top-bar"> Connections </div>
                        <div className="settings-info">
                            Your account can be linked with other apps.
                        </div>
                        <div className="settings-info">
                            Use the tabs below to manage permissions and linked accounts. Your passwords and billing informations will be never shared with third party apps.
                        </div>

                    </div>
                </div>
        </Fragment>
        
    );
}
Connections.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(Connections);