import React, { Fragment, useEffect, useState, useRef } from 'react';
import {addPost, getPosts} from '../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddPost = ({addPost, getPosts, post: {posts}, setAlert, postInputView, setPostInputView}) => {


    useEffect(()=> {
        getPosts()
    }, [])
    
    
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
        title: null,
        text:''
    });
    const {title, text} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleText = (e, editor) => {
        const data = editor.getData();
        setFormData({...formData, text: data})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addPost(formData);
    }

    return (
        <Fragment>
            <div className="addInputView" ref={scrollTo}>
                <label className="song-label">
                    New post creator
                </label>
                <button type="button" className="x-top-right" onClick={e=>setPostInputView(!postInputView)}>X</button>
            <form onSubmit={e=>onSubmit(e)}>

                {
                    field.default && <Fragment>
                        <label className="song-info">
                            Please create and customize the new post.
                        </label>

                        <label className="inputSongLabel"><input type="text" value={title} name="title" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .title of the post" /></label>
                        
                        
                        <Alert />
                        {
                            title !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, text:!field.text})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Title is required value.", "danger")}}>Next -></button>
                        }
                        
                        <button type="button" className="nextButton" onClick={e=>setPostInputView(!postInputView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.text && <Fragment>
                        <label className="song-info">
                            Message box
                        </label>
                        {
                            //<label className="textSongLabel"><textarea name="text" onChange={e=>onChange(e)} className="textSongArea" placeholder=" .text (optional)" /></label>
                        }
                        <div className="textSongLabel"><CKEditor editor={ClassicEditor} onChange={handleText} /></div>

                        {
                            text ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({text:!field.text, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Text message is required value.", "danger")}}>Next -></button>
                        }
                        
                        <button type="button" className="nextButton" onClick={e=>{setField({text:!field.text, submit:!field.submit})}}>Go back</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the post.
                        </label>

                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, text:!field.text})}}>Go back</button>
                        <button type="button" className="nextButton" onClick={e=>setPostInputView(!postInputView)}>Cancel</button>
                    </Fragment>
                }

            </form>
                
                
            </div>
        </Fragment>
    );
}
AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {addPost, getPosts, setAlert})(AddPost);