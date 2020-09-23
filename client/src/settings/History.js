import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const History = ({auth:{user}, profile:{profile}, setPersonalView, personalView}) => {
    
    return (
        <Fragment>
            <div className="content-box-settings">
                    <div className="content-settings">
                        
                        <div className="top-bar"> Login History </div>
                        <div className="settings-info">
                            Your login control tab.
                        </div>

                        {
                            !profile ? <div onClick={e=>setPersonalView(!personalView)}>Create profile.</div> : <Fragment>
                                {
                                    profile.logs.map((log, index) => <Fragment key={index}>
                                        <div className="settings-info" key={index}>
                                            {index + 1}. {moment().subtract('days', log.date).format("dddd")} || {moment(log.date).format('YYYY-MM-DD HH:mm:ss')} 
                                        </div>
                                        </Fragment>)
                                }
                            </Fragment>
                        }
                        

                        
                    </div>
                </div>
        </Fragment>
        
    );
}
History.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(History);