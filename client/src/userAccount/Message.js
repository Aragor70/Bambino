import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { seeMessage } from '../actions/chat';
import client from '../reducers/client';


const Message = ({message, seeMessage, index, messages, match, client, user }) => {

    let obj = document.getElementById(`scrollTo${messages.length}`)
    useEffect(()=> {
        
        if(obj) obj.scrollIntoView({block:'end'})
        
        
    }, [obj, match.params.id, match.params.x])

    useEffect(() => {
        seeMessage(message._id)
    }, [])

    console.log(message)

    return (
            <Fragment>
                <div className="full-width-message">
                {
                    message.user._id == client._id && <Fragment>
                        <div className="message-row" id={`scrollTo${index + 1}`}>
                        <span className="message-name">{client.name} </span> <span className="message-txt">{message.text}</span>
                        </div>
                    </Fragment> 
                }
                {
                    message.user._id == user._id && <Fragment>
                    <div className="message-row user-message" id={`scrollTo${index + 1}`}>
                        <span className="message-name">{user.name} </span> <span className="message-txt">{message.text}</span>
                        </div>
                        </Fragment>
                }
                </div>
                
            </Fragment>
    )
}
export default connect(null, {seeMessage})(Message);