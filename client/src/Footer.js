import React, { Component, createRef, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { addFeedback } from './actions/mail';
import FeedBack from './FeedBack';

class Footer extends Component {
    constructor(){
        super(),
        this.scrollTo = createRef()
        this.state = {
            feedbackView: false,
            formData: {
                name: '',
                email: '',
                message: '',
                exp: ''
            }
        }
    }

    handleButton = (e) => {
        const scrolling = new Promise(async() => {

            try {
                await this.setState({ feedbackView: !this.state.feedbackView });

                if(this.scrollTo.current) {
                    this.scrollTo.current.scrollIntoView({ behavior:'smooth', block:'center', inline:'nearest'})
                }
            } catch(err) {
                console.log('Could not scroll it.')
            }
        }) 
    }
    

    onChange = (e) => {
        this.setState({formData:{...this.state.formData, [e.target.name]: e.target.value}})
    }

    onSubmit = (e) => {
        e.preventDefault()
        addFeedback(this.state.formData)
        this.setState({feedbackView: false})
    }

    setView = (e) => {
        this.setState({ feedbackView: false })
    }

    render() {
        //console.log(this.state.formData)
        const { user } = this.props;
        
        

        return (
            <Fragment>
                <Switch>
                <div className="footer-content">
                    <img src={require('./style/up-arrow.png')} style={{zIndex: 2}} onClick={e=> {window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' }), this.setState({ feedbackView: false }) }} />                 
                    <div className="links" onClick={e=>this.setState({ feedbackView: false })}>
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
                                <p><Link to="/support" style={{color:'#121212'}} onClick={e=> window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' })}>Support</Link></p>
                            </Fragment>
                        }
                        
                        
                        
                    </div>
                        {
                            this.state.feedbackView && <Fragment>
                                <FeedBack scrollTo={this.scrollTo} onChange={this.onChange} setView={this.setView} />
                            </Fragment>
                        }
                    <div className="message" onClick={e=>this.handleButton(e) }>
                        Feedback message
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