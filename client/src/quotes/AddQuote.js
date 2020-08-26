import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import { addQuote } from '../actions/quote';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddQuote = ({setAlert, quoteView, setQuoteView, user, addQuote}) => {

    const scrollTo = useRef(null)
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        }
    }, [scrollTo])

    const [field, setField] = useState({
        default: true,
        text: false,
        submit: false
    });

    const [formData, setFormData] = useState({
        content: '',
        location: '',
        author: ''
    });
    const { content, location, author } = formData;
    
    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, content: data})
    }

    const onSubmit = async e => {
        e.preventDefault();
        addQuote(formData);

        
        setQuoteView(false);
    }    
    
    return (
        <Fragment>
            <div className="songInputView" ref={scrollTo}>
                        <label className="song-label">
                            Add new Quote
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setQuoteView(!quoteView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Put quote from your favorite author, select it from history, movie, book, song, etc.
                        </label>

                        <form onSubmit={e=> onSubmit(e) }>
                        <label className="inputSongLabel"><input type="text" value={location} name="location" onChange={e=>handleChange(e)}className="inputSongInfo" placeholder=" .location" /></label>
                        <label className="inputSongLabel"><input type="text" value={author} name="author" onChange={e=>handleChange(e)}className="inputSongInfo" placeholder=" .author" /></label>
                            
                        </form>
                        
                        

                        <Alert />
                        {
                            location && author ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, text:!field.text})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Values cannot be empty.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setQuoteView(!quoteView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment>
                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>
                        <Alert />
                        {
                            formData.content !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text is required value.", "danger")}}>Next -></button>
                        }
                        
                        
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, default:!field.default})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the quote.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right" onClick={e=> onSubmit(e) }>Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setQuoteView(!quoteView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddQuote.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addQuote: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
    
}
export default connect(null, {setAlert, addQuote})(AddQuote);