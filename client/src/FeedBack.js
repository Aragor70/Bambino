import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import { addFeedback } from './actions/mail';

const FeedBack = ({scrollTo, setView, addFeedback }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        exp: ''
    })
    const { name, email, message, exp } = formData
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    console.log(formData)
    const onSubmit = (e) => {
        e.preventDefault()
        addFeedback(formData)
        setView(false)
    }
    return (
        <Fragment>
            <div className='feedback-content' ref={scrollTo}>
            <form onSubmit={e=>onSubmit(e)}>
                    <button type='button' className="x-top-right" onClick={e=>setView(false)}>X</button>
                <p>Feedback message</p>
                <div className="feedback-title">Please provide your opinion below.</div>
                
                <div className="feedback-title">How do you rate your overall experience?</div>
                <div className="radio-box" >
                <input type="radio" name="exp" className="radio-exp" value="bad" onChange={e=>onChange(e)}/> bad
                <input type="radio" name="exp" className="radio-exp" value="average" onChange={e=>onChange(e)}/> average
                <input type="radio" name="exp" className="radio-exp" value="good" onChange={e=>onChange(e)}/> good
                </div>
                <textarea type="textarea" name="message" className="feedback-message" value={message} placeholder=" .Here" maxLength="6000" rows="7" onChange={e=>onChange(e)} ></textarea>

                <label htmlFor="name" className="feedback-input">
                    <span>Name</span>
                <input type="text" name="name" placeholder=" (optional) " value={name} onChange={e=>onChange(e)} />
                </label>
                <label htmlFor="email" className="feedback-input">
                    <span>E-mail</span>
                <input type="text" name="email" placeholder=" (optional) " value={email} onChange={e=>onChange(e)} />
                </label>
                <button className="nextButton">Send</button>
            </form>                     
            </div>
        </Fragment>
    )
}
export default connect(null, {addFeedback})(FeedBack);