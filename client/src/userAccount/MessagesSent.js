import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSentMessages } from '../actions/chat';
import TopChat from './TopChat';
import moment from 'moment'

const MessagesSent = ({ msgOptions, setMsgOptions, chat: {messages}, getSentMessages }) => {

    useEffect(() => {
        getSentMessages(0)
    }, [getSentMessages])
    
    const handleScroll = (e) => {

        if( e && e.scrollHeight - e.scrollTop === e.clientHeight ) {
            console.log('get more messages')
            getSentMessages(20);
        }

    }

    return (
        <Fragment>
            <div className="shield-personal">
            <div className="messager-content">
                <div className="messages-left">
                <div className="page-title" onClick={e=>setMsgOptions(!msgOptions)}>Sent messages</div>   
                {
                    msgOptions && <Fragment>
                        <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" />
                    </Fragment>
                }
                <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" hidden={true} />
                </div>
                
        <div className="messages-right">
            <div className="content-messages" onScroll={e=>handleScroll(e)} >
            <h1>Sent messages</h1>
                {
                    messages && messages.map(message => <p><span className="msg-text"><b>{message.to.name}</b> - {message.text}</span> <span className="msg-date">{moment(message.date).format('YYYY-MM-DD')}</span></p>)
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
export default connect(mapStateToProps, {getSentMessages})(MessagesSent)