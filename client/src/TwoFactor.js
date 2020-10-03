import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { checkLogin, login } from './actions/auth';
import Alert from './Alert';
import auth from './reducers/auth';



const TwoFactor = ({checkLogin, match, history, isAuthenticated, location}) => {

    const [formData, setFormData] = useState({
        code0: null,
        code1: null,
        code2: null,
        code3: null,
        code4: null,
        code5: null,
    })
    const { code0, code1, code2, code3, code4, code5 } = formData

   

    const onChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value})
        
        if ( e.target.value.length == 1) {
            
            let targetBox = Number(e.target.name.slice(4)) + Number(1)
            if(targetBox == 6) {
                targetBox = 5
            }
            document.querySelector(`#code${targetBox}`).focus()
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = []
        
        for( let i in formData) {
            data.push(formData[i])
        }
        await checkLogin(data, match.params.id, history)

    }

    useEffect( ()=> {
        
        const query = new URLSearchParams(location.search);
        const key = query.get('key')
        if( key ) {

            let numbers = key.split(',')
            
            setFormData({...formData, 
                code0: numbers[0],
                code1: numbers[1],
                code2: numbers[2],
                code3: numbers[3],
                code4: numbers[4],
                code5: numbers[5],
            })
        }
    }, [])
        console.log(formData)

    // Redirect if user logged in
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <Fragment>
            <div className="shield">
            <div className="login-content">
                
                <label htmlFor="code" className="login-label"> Log in </label>
                <form onSubmit={e=>onSubmit(e)} className="auth-form" >
                <label className="log-label">
                    <input type="text" className="code-box" id="code0" name="code0" value={code0}  onChange={e=>onChange(e)} maxLength="1" required />
                    <input type="text" className="code-box" id="code1" name="code1" value={code1}  onChange={e=>onChange(e)} maxLength="1" required />
                    <input type="text" className="code-box" id="code2" name="code2" value={code2}  onChange={e=>onChange(e)} maxLength="1" required />
                    <input type="text" className="code-box" id="code3" name="code3" value={code3}  onChange={e=>onChange(e)} maxLength="1" required />
                    <input type="text" className="code-box" id="code4" name="code4" value={code4}  onChange={e=>onChange(e)} maxLength="1" required />
                    <input type="text" className="code-box" id="code5" name="code5" value={code5}  onChange={e=>onChange(e)} maxLength="1" required />
                    
                    
                </label>
                
                <input className="auth-button" type="submit" value="Run code" />
                </form>

            <Alert />

            </div>

        </div>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {checkLogin})(withRouter(TwoFactor));