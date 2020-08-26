import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';


const ProfilePersonal = ({profile}) => {

    const [hiddenData, showData] = useState(false);

    return (
        <div className="user-personal">
            <div className="personal-param"> name : {profile.user.name} </div>
            <div className="toggle-button" onClick={()=>showData(!hiddenData)}>
            <div className="personal-button">personal data <img className="expand-arrow" src={ require('../style/down.png') } /></div>
            </div>
            {
                hiddenData && <Fragment>
                    <div className="personal-param"> age :{ReactHtmlParser('&nbsp')}  <Moment format="YYYY-DD-MM">{profile.age}</Moment></div>
                    <div className="personal-param"> location : {profile.location} </div>
                    <div className="personal-param"> passion : {profile.passion} </div>
                    <div className="personal-param"> status : {profile.status} </div>
                    <div className="personal-param"> skills : {profile.skills} </div>
                    <div className="personal-social">
                    <div className="social-button"> gt </div><div className="social-button"> yt </div><div className="social-button"> tw </div><div className="social-button"> fb </div><div className="social-button"> lk </div><div className="social-button"> in </div>
                    </div>
                </Fragment>
            }
            <hr/>
        </div>
    );
}
export default ProfilePersonal;