import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getNotifies, openNotifies } from '../actions/chat';


const NavNotify = ({ chat: { loading, notifies }, openNotifies, getNotifies, setNotify, notify }) => {

    useEffect(()=> {

        getNotifies()
    }, [getNotifies])

        const [isMatch, setIsMatch] = useState(false)

        useEffect(()=> {
            notifies.messager && notifies.messager.filter(message => !message.opened).length > 0 ? setIsMatch(true) : setIsMatch(false)
            notifies.service && notifies.service.filter(message => !message.opened).length > 0 ? setIsMatch(true) : setIsMatch(false)
        }, [notifies])

    
        return (
            <Fragment>
                {
                    isMatch ? <img className="notifyImage" src={require('../style/notificationOn.png')} onClick={ e=> {setNotify(!notify), openNotifies()} } /> : <img className="notifyImage" src={require('../style/notificationOff.png')} onClick={ e=> setNotify(!notify) } /> 
                }
            </Fragment>
        )
}
const mapStateToProps = state => ({
    chat: state.chat
})
export default connect(mapStateToProps, { getNotifies, openNotifies })(NavNotify)