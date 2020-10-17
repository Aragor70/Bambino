import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifies, removeNotifies, removeNotify, seeNotify } from '../actions/chat'
import Notification from './Notification';


const Notify = ({ getNotifies, seeNotify, chat: { notifies }, setNotify, notify, removeNotify, removeNotifies }) => {

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
                <div className="user-menu-btn" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', padding: 0 }}>
                    Notify List <button className="x-top-right" style={{borderRadius: '25px'}} onClick={e => removeNotifies()}>CLEAR</button>
                </div>

                {
                    notifies && notifyList ? notifyList.map(notification => <Notification key={notification._id} setNotify={setNotify} notify={notify} notification={notification} />)
                    : <Fragment>
                        empty
                    </Fragment>
                }
                
            
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    chat: state.chat
})
export default connect(mapStateToProps, { getNotifies, removeNotify, removeNotifies, seeNotify })(Notify)