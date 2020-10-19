import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getReceivedMessages } from '../actions/chat';
import TopChat from './TopChat';
import UserChat from './UserChat';
import UsersPage from './UsersPage';
import moment from 'moment';


const Messages = ({ msgOptions, setMsgOptions, getReceivedMessages, chat: {messages} }) => {

    useEffect(() => {
        getReceivedMessages(0)
    }, [getReceivedMessages])

    const handleScroll = (e) => {
        if( e.scrollHeight - e.scrollTop === e.clientHeight ) {
            getReceivedMessages(20)
        }
    }
    return (
        <Fragment>
        <div className="shield-personal">
        <div className="messager-content">
            <div className="messages-left">
            
            <div className="page-title" onClick={e=>setMsgOptions(!msgOptions)} >Received</div>   
            {
                msgOptions && <Fragment>
                    <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" />
                </Fragment>
            }
            <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="users" topValue="options" hidden={true} />
            </div>
            
            
            
            <div className="messages-right">
                <div className="content-messages" onScroll={e=> handleScroll(e)} >
                <h1>Received Messages</h1>
                {
                    messages && messages.map(message => <p><span className="msg-text"><b>{message.user.name}</b> - {message.text}</span> <span className="msg-date">{moment(message.date).format('YYYY-MM-DD')}</span></p>)
                }
                </div>
            </div>
        </div>
        </div>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat
})
export default connect(mapStateToProps, {getReceivedMessages})(Messages);