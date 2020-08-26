import React, { Fragment } from 'react';


const Source = ({user, profile}) => {

    return (
    <Fragment>
        <div className="visit-param">
        <p>Welcome {user.name}</p>
        <p>Manage your account, privacy and security.</p>
        </div>
    </Fragment>
    );
}
export {Source};


const Personal = ({user, profile}) => {

    return (
    <Fragment>
        <div className="personal-param">
            <p>Your personal data to use in your profile.</p>
        </div>
        <div className="personal-box">
            <p>name - {user.name}</p>
            <p>age - {profile.age}</p>
            <p>status - {profile.status}</p>
            <p>avatar - {user.name}</p>
            <p>e-mail - {user.email}</p>
        </div>
    </Fragment>
    );
}
export {Personal};