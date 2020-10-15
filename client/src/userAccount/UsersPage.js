import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClients } from '../actions/user';
import TopChat from './TopChat';




const UsersPage = ({ client: {clients}, getClients, msgOptions, setMsgOptions }) => {

    useEffect(() => {
        getClients()
    }, [getClients])


    return (
        <Fragment>
            <div className="shield-personal">
                <div className="messager-content">
                <div className="messages-left">
                <div className="page-title" onClick={e=>setMsgOptions(!msgOptions)}>Users page</div>   
                {
                    msgOptions && <Fragment>
                        <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" />
                    </Fragment>
                }
                <TopChat msgOptions={msgOptions} setMsgOptions={setMsgOptions} toggle={true} topValue="options" hidden={true} />
                </div>
                
                
            <div className="messages-right">
                <div className="content-messages" >
                    <h1>Users</h1>
                    {
                        clients && clients.map((client, index) => <p><Link to={`/messages/${client._id}`} >{index + 1}. {client.name}</Link></p>)
                    }
                </div>
            </div>
        </div>
        </div>
        </Fragment>

    )
}
const mapStateToProps = state => ({
    client: state.client
})
export default connect(mapStateToProps, {getClients})(UsersPage);