import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getClients } from '../actions/user';



const TopChat = ({ msgOptions, setMsgOptions, toggle=false, topValue=null, client: {clients}, getClients, hidden=false }) => {

    useEffect(() => {
        getClients()
    }, [getClients])
    
    return (
        <Fragment>
            {
                topValue == "options" && <Fragment>
                    <div className="topChat-content" id={hidden ? 'hidden' : null} style={toggle ? {position: "absolute", top: "13vh", zIndex: 7} : null}>
                        <div className="messages-navs">
                        
                            <Link to="/messages" onClick={e=> setMsgOptions(false)}><div className="messages-nav">received </div></Link>
                            <Link to="/messages/sent" onClick={e=> setMsgOptions(false)}><div className="messages-nav">sent </div></Link> 
                            <Link to='/messages/users' onClick={e=> setMsgOptions(false)}><div className="messages-nav">Chat with users </div></Link> 
                            
                        </div>
                
                    </div>
                </Fragment>
            }
            {
                topValue == "users" && <Fragment>
                    <div className="topChat-content" style={toggle ? {position: "absolute", top: "13vh", zIndex: 8} : null}>
                        <div className="messages-navs">
                            {
                                clients && clients.map(client=> <Link to={`/messages/${client._id}`} onClick={e=> setMsgOptions(false)}><div className="messages-nav">{client.name} </div></Link>)
                            }
                        </div>
                
                    </div>
                </Fragment>
            }
            
            
        </Fragment>
    )
}
const mapStateToProps = state => ({
    client: state.client
})
export default connect(mapStateToProps, {getClients})(TopChat);