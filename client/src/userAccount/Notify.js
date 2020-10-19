import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getNotifies, removeNotifies, removeNotify, seeNotify } from '../actions/chat'
import Notification from './Notification';


const Notify = ({ getNotifies, history, seeNotify, chat: { notifies }, setNotify, notify, removeNotify, removeNotifies }) => {

    useEffect(() => {
        getNotifies()
    }, [getNotifies, seeNotify])


        const { messager, service } = notifies
        
    function compareFunction(a, b) {
        const valueA = a.date
        const valueB = b.date

        let comparsion = 0;
        if (valueA < valueB) {
            comparsion = 1
        }
        if (valueA > valueB) {
            comparsion = -1
        }
        return comparsion;
    }

        
        const allNotifies = messager.concat(service)
        const notifyList = allNotifies.sort(compareFunction)
            
        

    return (
        <Fragment>
            <div className="notify-cloud">
                <div className="user-notify-header" >
                    Notify <button className="x-top-right" style={{borderRadius: '25px'}} onClick={e => {removeNotifies(), setNotify(false)}}>CLEAR</button>
                </div>
                <div className="user-notify-header" style={{ justifyContent: 'flex-end', marginBottom:'0px' }}>
                    <img src={require('../style/received-message.png')} height="24px" style={{marginRight: "10px"}} onClick={e=> {history.push('/messages'), setNotify(false)}} />
                    <img src={require('../style/send-message.png')} height="24px" style={{marginRight: "10px"}} onClick={e=> {history.push('/messages/users'), setNotify(false)}}/>
                </div>
                <div className="notifies-box">
                {
                    notifies && notifyList ? notifyList.map(notification => <Notification key={notification._id} setNotify={setNotify} notify={notify} notification={notification} />)
                    : <Fragment>
                        empty
                    </Fragment>
                }
                </div>
            
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat
})
export default connect(mapStateToProps, { getNotifies, removeNotify, removeNotifies, seeNotify })(withRouter(Notify))