import React, { Fragment } from 'react';

const FeedBack = ({scrollTo, onChange, setView, onSubmit}) => {


    return (
        <Fragment>
            <div className='feedback-content' ref={scrollTo}>
            <form onSubmit={e=>onSubmit(e)}>
                    <button type='button' className="x-top-right" onClick={e=>setView(e)}>X</button>
                <p>Feedback message</p>
                <div className="feedback-title">Please provide your opinion below.</div>
                
                <div className="feedback-title">How do you rate your overall experience?</div>
                <div className="radio-box" >
                <input type="radio" name="exp" className="radio-exp" value="bad" onChange={e=>onChange(e)}/> bad
                <input type="radio" name="exp" className="radio-exp" value="average" onChange={e=>onChange(e)}/> average
                <input type="radio" name="exp" className="radio-exp" value="good" onChange={e=>onChange(e)}/> good
                </div>
                <textarea type="textarea" name="message" className="feedback-message" placeholder=" .Here" maxLength="6000" rows="7" onChange={e=>onChange(e)} ></textarea>

                <label htmlFor="name" className="feedback-input">
                    <span>Name</span>
                <input type="text" name="name" placeholder=" (optional) " onChange={e=>onChange(e)} />
                </label>
                <label htmlFor="email" className="feedback-input">
                    <span>E-mail</span>
                <input type="text" name="email" placeholder=" (optional) " onChange={e=>onChange(e)} />
                </label>
                <button className="nextButton">Send</button>
            </form>                     
            </div>
        </Fragment>
    )
}
export default FeedBack;