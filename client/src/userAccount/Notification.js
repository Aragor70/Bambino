import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeNotify, seeNotify } from '../actions/chat';

import { Link } from 'react-router-dom';

const Notification = ({ notification, removeNotify, chat, setNotify, notify, seeNotify, messager=true }) => {

    
    
    return (
        <Fragment>
            {
                messager && <Fragment>
                    <div className="user-notify-btn"><Link to={`/messages/${notification.from}`} onClick={e=> {setNotify(false), seeNotify(notification._id)}} style={notification.seen ? {color:'auto'} : {color: '#49c500'}}>
                        <span>{notification.name}</span>{notification.text}</Link><button type='button' className="x-top-right" onClick={e=> removeNotify(notification._id)} >X</button>
                    </div>
                    </Fragment> 
            }
            {
                !messager && <Fragment>
                        <div className="user-notify-btn"><Link onClick={e=> {setNotify(false), seeNotify(notification._id)}} style={notification.seen ? {color:'auto'} : {color: 'yellow'}}>
                            <span>{notification.from}</span>{notification.text}</Link><button type='button' className="x-top-right" onClick={e=> removeNotify(notification._id)} >X</button>
                        </div>
                    </Fragment>
            }
            
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat
})
export default connect(mapStateToProps, { removeNotify, seeNotify })(Notification);