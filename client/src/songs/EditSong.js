import React, { Fragment, useState, useEffect, useRef } from 'react';

import {getAuthors} from '../actions/author';
import {editSong, getSong} from '../actions/song';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { setAlert } from '../actions/alert';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditSong = ({songId, song:{song, loading}, getAuthors, editSong, author: {authors}, setAlert, editInputView, setEditInputView}) => {

    

    const [formData, setFormData] = useState({
        title:null,
        author:null,
        text:null,
        album:'',
        language:null,
        category:'',
        publicationYear:'',
        video:''
    });
    const {title, author, text, album, language, category, publicationYear, video} = formData;

    useEffect(()=> {
        getAuthors();
        getSong(songId)
    }, []);

    useEffect(() => {
        getSong(songId)
        setFormData({
            title: loading || !song.title ? '' : song.title,
            author: loading || !song.author ? '' : song.author,
            text: loading || !song.text ? '' : song.text,
            album: loading || !song.album ? '' : song.album,
            language: loading || !song.language ? '' : song.language,
            category: loading || !song.category ? '' : song.category,
            publicationYear: loading || !song.publicationYear ? '' : song.publicationYear,
            video: loading || !song.video ? '' : song.video
        });
    }, [loading]);

    const [field, setField] = useState({
        default: true,
        metric: false,
        text: false,
        video: false,
        submit: false
    });

    const selection = authors.map(auth=><option value={auth._id} key={auth._id}>{auth.author}</option>)

    

    

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, text: data})
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        editSong(song._id, formData);
        setEditInputView(!editInputView);
    }


    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    },[field])

    console.log(text)

    return (
        <Fragment>
            <div className="songInputView" ref={scrollTo}>
                        <label className="song-label">
                            Song editor mode
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setEditInputView(!editInputView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment >
                        
                        <label className="song-info">
                            Edit title and customize it.
                        </label>
                        
                        <label className="inputSongLabel"><input type="text" value={title} name="title" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .title"  /></label>
                                               
                        
                        <Alert />
                        {
                            formData.author !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, metric:!field.metric})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Title is required value.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setEditInputView(!editInputView)}>Cancel</button>
                        
                    </Fragment>
                }
                {
                    field.metric && <Fragment >
                        <label className="inputSongLabel"><input type="text" value={album} name="album" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .album (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={language} name="language" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .language" /></label>
                        <label className="inputSongLabel"><input type="text" value={category} name="category" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .category (optional)" /></label>
                        <label className="inputSongLabel"><input type="text" value={publicationYear} name="publicationYear" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .year of publication" /></label>
                        
                        <Alert />
                        {
                            formData.language !== null && formData.publicationYear !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({metric:!field.metric, text:!field.text})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Language is required value.", "danger")}}>Next -></button>
                        }

                        
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({metric:!field.metric, default:!field.default})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment >
                        {
                           // <label className="textSongLabel"><textarea name="text" onChange={e=>onChange(e)} className="textSongArea" placeholder=" .song text" />
                        }

                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>
                        <Alert />
                        {
                            text ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, video:!field.video})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text is required value.", "danger")}}>Next -></button>
                        }
                        
                        
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, metric:!field.metric})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.video && <Fragment >
                        <label className="song-info">
                            Add video url from YouTube
                        </label>
                        <label className="inputSongLabel"><input type="text" value={video} name="video" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .video url..." /></label>
                        <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({video:!field.video, submit:!field.submit})}}>Next -></button>
                        <button type="button" className="nextButton" onClick={e=>{setField({video:!field.video, text:!field.text})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment >
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the song.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, video:!field.video})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setEditInputView(!editInputView)}>Cancel</button>
                    </Fragment>
                }

                </form>
                
            </div>
        </Fragment>
    )
}
EditSong.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    addSong: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    author: state.author,
    song: state.song
})
export default connect(mapStateToProps, {getAuthors, editSong, setAlert})(EditSong);