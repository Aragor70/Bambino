import React, { Fragment, useEffect, useState, useRef } from 'react';
import {addAuthor, getAuthors} from '../actions/author';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddAuthor = ({addAuthor, getAuthors, author: {authors}, setAlert, authorInputView, setAuthorInputView, songInputView, setSongInputView}) => {

    

    useEffect(()=> {
        getAuthors()
    }, [])

    const [field, setField] = useState({
        default: true,
        metric: false,
        text: false,
        submit: false
    });
    

    const [formData, setFormData] = useState({
        author: null,
        nationality:'',
        age:'',
        genres:'',
        instruments:'',
        bio:null
    });
    const {author, nationality, age, genres, instruments, bio} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, bio: data})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addAuthor(formData);
        setAuthorInputView(!authorInputView);
    }
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [field])
    return (
        <Fragment>
            <div className="addInputView" ref={scrollTo}>
                <label className="song-label">
                    New author creator
                </label>
                <button type="button" className="x-top-right" onClick={e=>setAuthorInputView(!authorInputView)}>X</button>
            <form onSubmit={e=>onSubmit(e)}>

                {
                    field.default && <Fragment>
                        <label className="song-info">
                            Please create and customize the new author.
                        </label>
                        <label className="inputSongLabel"><input type="text" value={author} name="author" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .name" /></label>
                        <label className="inputSongLabel"><input type="text" value={nationality} name="nationality" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .nationality (optional)" /></label>
                        
                        <Alert />
                        {
                            author !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, metric:!field.metric})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Author name is required value.", "danger")}}>Next -></button>
                        }
                        
                        <button type="button" className="nextButton" onClick={e=>setAuthorInputView(!authorInputView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.metric && <Fragment>
                        <label className="song-info">
                            Please present more details.
                        </label>
                        <label className="inputSongLabel"><input type="text" value={age} name="age" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .age (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={genres} name="genres" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .genres (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={instruments} name="instruments" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .instruments (optional)" /></label>

                        <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({metric:!field.metric, text:!field.text})}}>Next -></button>
                        <button type="button" className="nextButton" onClick={e=>{setField({metric:!field.metric, default:!field.default})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment>
                        <label className="song-info">
                            Please write something about this author.
                        </label>
                        {
                            //<label className="textSongLabel"><textarea name="text" onChange={e=>onChange(e)} className="textSongArea" placeholder=" .text (optional)" /></label>
                        }
                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>
                        <Alert />
                        {
                            bio ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text is required value.", "danger")}}>Next -></button>
                        }
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, metric:!field.metric})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the author.
                        </label>

                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, text:!field.text})}}>Go back</button>
                        <button type="button" className="nextButton" onClick={e=>setAuthorInputView(!authorInputView)}>Cancel</button>
                    </Fragment>
                }

            </form>
                
                
            </div>
        </Fragment>
    );
}
AddAuthor.propTypes = {
    addAuthor: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    author: state.author
})
export default connect(mapStateToProps, {addAuthor, getAuthors, setAlert})(AddAuthor);