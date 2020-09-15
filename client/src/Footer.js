import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { addFeedback } from './actions/mail';

class Footer extends Component {
    constructor(){
        super(),
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
        
    

    onChange = (e) => {
        this.setState({formData:{...this.state.formData, [e.target.name]: e.target.value}})
    }

    onSubmit = (e) => {
        e.preventDefault()
        addFeedback(this.state.formData)
        this.setState({feedbackView: false})
    }

    render() {
        console.log(this.state.formData)
        const { user } = this.props;
        
        return (
            <Fragment>
                <Switch>
                <div className="footer-content">
                    <img src={require('./style/up-arrow.png')} onClick={e=> {window.scrollTo({ behavior: 'smooth', top: 0, inline: 'center' }), this.setState({ feedbackView: !this.state.feedbackView }) }} />                 
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
                                <p><Link style={{color:'gray'}}>Support</Link></p>
                            </Fragment>
                        }
                        
                        
                        
                    </div>
                        {
                            this.state.feedbackView && <Fragment>
                                <div className='feedback-content'>
                                    <form onSubmit={e=>this.onSubmit(e)}>
                                    <p>Feedback message</p>
                                    <div className="feedback-title">Please provide your opinion below.</div>
                                    
                                    <div className="feedback-title">How do you rate your overall experience?</div>
                                    <div className="radio-box" >
                                    <input type="radio" name="exp" className="radio-exp" value="bad" onChange={e=>this.onChange(e)}/> bad
                                    <input type="radio" name="exp" className="radio-exp" value="average" onChange={e=>this.onChange(e)}/> average
                                    <input type="radio" name="exp" className="radio-exp" value="good" onChange={e=>this.onChange(e)}/> good
                                    </div>
                                    <textarea type="textarea" name="message" className="feedback-message" placeholder=" .Here" maxLength="6000" rows="7" onChange={e=>this.onChange(e)} ></textarea>

                                    <label htmlFor="name" className="feedback-input">
                                        <span>Name</span>
                                    <input type="text" name="name" placeholder=" (optional) " onChange={e=>this.onChange(e)} />
                                    </label>
                                    <label htmlFor="email" className="feedback-input">
                                        <span>E-mail</span>
                                    <input type="text" name="email" placeholder=" (optional) " onChange={e=>this.onChange(e)} />
                                    </label>
                                    <button className="nextButton">Send</button>
                                    </form>
                                </div>
                            </Fragment>
                        }
                    <div className="message" onClick={e=>this.setState({ feedbackView: !this.state.feedbackView })}>
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