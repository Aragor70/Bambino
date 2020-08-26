import React, { useState, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createQuote} from './actions/profile';
import Alert from './Alert';

const CreateQuote = ({createQuote, history, hiddenCreateQuote, showCreateQuote}) => {
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        location: '',
        author: ''
    });
    const { title, content, location, author } = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createQuote(formData, history);

    }
    return (
        <Fragment>
            {
                hiddenCreateQuote && <Fragment>
                <div className="createQuote" >
                <p className="visit-param"><Link to='/account'> <img className="features-arrow-back" src={ require('./style/arrow_left.png') } onClick={()=>showQuote(!hiddenQuote)}/> </Link>Add new quote</p>
    
    
            <form onSubmit={(e)=>onSubmit(e)}>
            <label className="featuresLabel"><input className="featuresInput" type="text" name="title" value={title} onChange={(e)=> handleChange(e)} placeholder=" .title" /><img className="editImage" src={ require('./style/edit.png') } /></label>
            <label className="featuresLabel"><input className="featuresInput" type="text" name="author" value={author} onChange={(e)=> handleChange(e)} placeholder=" .author" /><img className="editImage" src={ require('./style/edit.png') } /></label>
            <label className="featuresLabel"><input className="featuresInput" type="text" name="location" value={location} onChange={(e)=> handleChange(e)} placeholder=" .location" /><img className="editImage" src={ require('./style/edit.png') } /></label>
            <label className="featuresTextareaLabel"><textarea className="featuresTextareaInput" type="text" name="content" value={content} onChange={(e)=> handleChange(e)} placeholder=" .quote" /><img className="editImage" src={ require('./style/edit.png') } /></label>    
            <input className="featuresmBtn" type="submit" value="Save" />
            </form>
            
            <Alert />
            </div>
            </Fragment>
            }
        
            
        </Fragment>
    )
}
CreateQuote.propTypes = {
    createQuote: PropTypes.func.isRequired
}
export default connect(null, {createQuote})(withRouter(CreateQuote));