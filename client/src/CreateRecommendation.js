import React, {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createRecommendation} from './actions/profile';
import { applyMiddleware } from 'redux';
import Alert from './Alert';


const CreateRecommendation = ({hiddenCreateRecomm, showCreateRecomm, createRecommendation, history}) => {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        location: ''
    });
    const {title, author, description, location} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createRecommendation(formData, history);
    }

    return (
        <Fragment>
            {
               hiddenCreateRecomm && <Fragment>
                   <div className="createRecommendation" >
                <p className="visit-param"><Link to='/account'> <img className="features-arrow-back" src={ require('./style/arrow_left.png') } onClick={()=>showRecomm(!hiddenRecomm)}/> </Link>Add that is you like</p>
        <form onSubmit={e=>onSubmit(e)}>
        <label className="featuresLabel"><input className="featuresInput" type="text" name="title" value={title} onChange={(e)=> handleChange(e)} placeholder=" .title" /><img className="editImage" src={ require('./style/edit.png') } /></label>
        <label className="featuresLabel"><input className="featuresInput" type="text" name="author" value={author} onChange={(e)=> handleChange(e)} placeholder=" .author" /><img className="editImage" src={ require('./style/edit.png') } /></label>
        <label className="featuresLabel"><input className="featuresInput" type="text" name="description" value={description} onChange={(e)=> handleChange(e)} placeholder=" .description" /><img className="editImage" src={ require('./style/edit.png') } /></label>
        <label className="featuresSelectLabel"><select className="featuresSelectInput" type="text" name="location" value={location} onChange={(e)=> handleChange(e)} ><option> .select location</option><option value="Book">Book</option><option value="Movie">Movie</option></select><img className="editImage" src={ require('./style/edit.png') } /></label>
            <input className="featuresmBtn" type="submit" value="Save" />
            
        </form>
        <Alert />
                </div>
                </Fragment>
            }
        
        </Fragment>
    )
}
CreateRecommendation.propTypes = {
    createRecommendation: PropTypes.func.isRequired
}
export default connect(null, {createRecommendation})(withRouter(CreateRecommendation));