import React, { Fragment, useState, useEffect, useRef } from 'react';

import {getAuthors} from '../actions/author';
import {addSong} from '../actions/song';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { setAlert } from '../actions/alert';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddSong = ({getAuthors, addSong, author: {authors}, setAlert, songInputView, setSongInputView, authorInputView, setAuthorInputView}) => {

    useEffect(()=> {
        getAuthors();
    }, []);

    

    const [field, setField] = useState({
        default: true,
        metric: false,
        text: false,
        video: false,
        submit: false
    });

    const selection = authors.map(auth=><option value={auth._id} key={auth._id}>{auth.author}</option>)

    const [formData, setFormData] = useState({
        title:null,
        author:null,
        text:null,
        album:'',
        language:null,
        category:'',
        publicationYear:null,
        video:''
    });

    const {title, author, text, album, language, category, publicationYear, video} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, text: data})
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        addSong(formData);
        setSongInputView(!songInputView);
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
                            New song creator
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setSongInputView(!songInputView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment> 
                        
                        <label className="song-info" >
                            Add your favorite title and customize it.
                        </label>    
                        <label className="song-info">Please select right author or create the new one.</label>
                        
                        <label className="inputSongLabel"><input type="text" value={title} name="title" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .title"  /></label>
                        <label className="selectSongLabel"><select name="author" value={author} onChange={e=>onChange(e)}className="selectSongInfo" required>{selection ? <><option value="" disabled selected hidden> .select author</option> {selection}</> : <option>...loading</option>}</select></label>
                        
                        <Alert />
                        {
                            formData.author !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, metric:!field.metric})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Title and author are required values.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setSongInputView(!songInputView)}>Cancel</button>
                        <button type="button" className="nextButton" onClick={e=>{setSongInputView(!songInputView); setAuthorInputView(!authorInputView)}}>New author</button>
                    </Fragment>
                }
                {
                    field.metric && <Fragment>
                        <label className="inputSongLabel"><input type="text" value={album} name="album" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .album (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={language} name="language" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .language" /></label>
                        <label className="inputSongLabel"><input type="text" value={category} name="category" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .category (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={publicationYear} name="publicationYear" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .year of publication" /></label>
                        
                        <Alert />
                        {
                            formData.language !== null && formData.publicationYear !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({metric:!field.metric, text:!field.text})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Language and year are required values.", "danger")}}>Next -></button>
                        }
                        
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({metric:!field.metric, default:!field.default})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment>
                        {
                           // <label className="textSongLabel"><textarea name="text" onChange={e=>onChange(e)} className="textSongArea" placeholder=" .song text" />
                        }

                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>
                        <Alert />
                        {
                            formData.text !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, video:!field.video})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text is required value.", "danger")}}>Next -></button>
                        }
                        
                        
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, metric:!field.metric})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.video && <Fragment>
                        <label className="song-info">
                            Add video url from YouTube
                        </label>
                        <label className="inputSongLabel"><input type="text" value={video} name="video" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .video url..." /></label>
                        <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({video:!field.video, submit:!field.submit})}}>Next -></button>
                        <button type="button" className="nextButton" onClick={e=>{setField({video:!field.video, text:!field.text})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the song.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, video:!field.video})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setSongInputView(!songInputView)}>Cancel</button>
                    </Fragment>
                }

                </form>
                
            </div>
        </Fragment>
    )
}
AddSong.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    addSong: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    author: state.author
})
export default connect(mapStateToProps, {getAuthors, addSong, setAlert})(AddSong);