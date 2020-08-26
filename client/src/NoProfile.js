import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const NoProfile = ({auth: {user}}) => {


    return (
        <Fragment>
            <div>You have not yet setup a profile.</div>
            <div><Link to="/profile_create"> Create a profile. </Link></div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(NoProfile);