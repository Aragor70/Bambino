import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {

    useEffect(() => {
        getProfiles();
    }, []);

        const profile = profiles.map((p) => {
            return (
                
                <ProfileItem key={p._id} profile={p} />
            )
            
        });

    return (
        <Fragment>
            <div className="profile-list">
                {
                    loading ? <p>loading...</p> : profile
                }   
            </div>
        </Fragment>
    );
}
Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles);