import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifies, removeNotifies, removeNotify } from '../actions/chat'
import Notification from './Notification';


const Notify = ({ getNotifies, chat: { notifies }, setNotify, notify, removeNotify, removeNotifies }) => {

    useEffect(() => {
        getNotifies()
    }, [getNotifies])


    return (
        <Fragment>
            <div className="notify-cloud">
                <div className="user-menu-btn" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', padding: 0 }}>
                    Notify List <button onClick={e => removeNotifies()}>Remove All</button>
                </div>
                {
                    notifies && notifies.messager ? notifies.messager.map(notification => <Notification key={notification._id} setNotify={setNotify} notify={notify} notification={notification} />)
                    : <Fragment>
                        empty
                    </Fragment>
                }
                {
                    notifies && notifies.service ? notifies.service.map(notification => <Notification key={notification._id} setNotify={setNotify} notify={notify} notification={notification} messager={false} />)
                    : <Fragment>
                        empty
                    </Fragment>
                }
                
            
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat,
})
export default connect(mapStateToProps, { getNotifies, removeNotify, removeNotifies })(Notify)