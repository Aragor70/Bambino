import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';

class Footer extends Component {
    
    render() {

        const { user } = this.props;

        return (
            <Fragment>
                <Switch>
                <div className="footer-content">
                    <img src={require('./style/up-arrow.png')} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })} />                 
                    <div className="links">
                        <h1>QUICK SHORTCUTS</h1>
                        {
                            user ? <Fragment>
                                <p><Link to="/" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Home</Link></p>
                                <p><Link to="/games" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Game zone</Link></p>
                                <p><Link to="/profile" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>My Account</Link></p>
                                <p><Link to="/settings" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Settings</Link></p>
                            </Fragment> : <Fragment>
                                
                                <p><Link to="/" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Home</Link></p>
                                <p><Link to="/games" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Game zone</Link></p>
                                <p><Link to="/login" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Log in</Link></p>
                                <p><Link to="/register" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Create Your Account</Link></p>
                                <p><Link style={{color:'gray'}}>Support</Link></p>
                            </Fragment>
                        }
                        
                        
                        
                    </div>

                    <div className="message">
                        send your feedback
                    </div>

                    <div className="network-contant">

                    </div>

                </div>
                </Switch>
            </Fragment>
        )
    }
}
export default Footer;