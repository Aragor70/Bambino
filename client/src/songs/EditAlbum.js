import React, { Fragment, useEffect, useState, useRef } from 'react';
import {editAlbum} from '../actions/author';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import ReactHtmlParser from 'react-html-parser';

const EditAlbum = ({author_id, album, editAlbum, setAlert, editInputView, setEditInputView}) => {

    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [scrollTo])

    const [formData, setFormData] = useState({
        album: '',
        year:''
    });

    useEffect(() => {
        setFormData({
            album: !album.album ? '' : album.album,
            year: !album.year ? '' : album.year
            
        });
    }, [album]);

    const [field, setField] = useState({
        default: true,
        submit: false
    });
    

    
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        editAlbum(author_id, album._id, formData);
        setEditInputView(!editInputView);
    }

    return (
        <Fragment>
            <div className="addInputView" ref={scrollTo}>
                <label className="song-label">
                    Edit mode album
                </label>
                <button type="button" className="x-top-right" onClick={e=>setEditInputView(!editInputView)}>X</button>
            <form onSubmit={e=>onSubmit(e)}>

                {
                    field.default && <Fragment>
                        <label className="song-info">
                            Edit album details.
                        </label>
                        <label className="inputSongLabel"><input type="text" value={formData.album} name="album" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .name" /></label>
                        <label className="inputSongLabel"><input type="text" value={formData.year} name="year" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .year" /></label>
                        
                        <Alert />
                        {
                            formData.album !== null || formData.year !== null ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Values are required.", "danger")}}>Next -></button>
                        }
                        
                        <button type="button" className="nextButton" onClick={e=>{setEditInputView(!editInputView)}}>Go Back</button>
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
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button type="button" className="nextButton" onClick={e=>setEditInputView(!editInputView)}>Cancel</button>
                    </Fragment>
                }

            </form>
                
                
            </div>
        </Fragment>
    );
}
EditAlbum.propTypes = {
    editAlbum: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}
export default connect(null, {editAlbum, setAlert})(EditAlbum);