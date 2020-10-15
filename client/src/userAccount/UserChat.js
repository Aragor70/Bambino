import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { getUserChat } from '../actions/chat';
import { getClientUser } from '../actions/user'
import Message from './Message';
import TopChat from './TopChat';
import UsersPage from './UsersPage';

const UserChat = ({ getUserChat, getClientUser, chat: { messages, notifies }, match, client: {client}, auth: {user} }) => {

    const handleScroll = (e) => {
        if(e.target.scrollTop === 0) {
            console.log('get more messages')
            getUserChat(match.params.id, 20);
        }
    }

    useEffect(() => {
        getClientUser(match.params.id)
        getUserChat(match.params.id, 0);
        
    }, [getUserChat, match.params.id, notifies.messager && notifies.messager.length])

    const [msgOptions, setMsgOptions] = useState(false)
    
    return (
        <Fragment>
            
            <div className="shield-personal">
                <div className="messager-content">
                    {
                        client && messages && <Fragment>
                            <div className="messages-left">
                            <div className="page-title" onClick={e=>setMsgOptions(!msgOptions)}>{ client && client.avatar.charAt(0) == "/" ? <img src={client.avatar} className="add-mrg-right" height="90%" /> : <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${client.avatar}`} className="add-mrg-right" height="90%" />} {client.name}</div>   
                            {
                                msgOptions && <Fragment>
                                   <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" />
                                </Fragment>
                            }
                            <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" hidden={true} />
                            </div>
                            
                            <div className="messages-right">
                                
                                <div className="content-messages" onScroll={e=>handleScroll(e)}>
                                    {
                                        messages.length > 0 ? messages.map((message, index) => <Message message={message} key={index} index={index} messages={messages} match={match} client={client} user={user} />) : <div className="empty-center-box"> Share your first message with {client.name}. </div>
                                    }
                                </div>
                                
                            </div>
                        </Fragment>
                    }
                    
                </div>
            </div>
            
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat,
    client: state.client,
    auth: state.auth
})
export default connect(mapStateToProps, { getUserChat, getClientUser })(UserChat);