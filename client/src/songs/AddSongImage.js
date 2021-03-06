import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import { addSongImage } from '../actions/song';


const AddSongImage = ({setAlert, imageInputView, setImageInputView, user, song, addSongImage}) => {

    

    const [field, setField] = useState({
        default: true,
        submit: false
    });

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    
    const [uploadedFile, setUploadedFile] = useState('');
    
    const fileSelectHandler = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        addSongImage(song._id, file);

        setUploadedFile({name: fileName, path: `/uploads/songs/image/${file.name}`});
        setFileName('Choose File');

        setImageInputView(false);
    }    
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [field])
    return (
        <Fragment>
            <div className="songInputView">
                        <label className="song-label">
                            Song image creator
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setImageInputView(!imageInputView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Choose image file as image.
                        </label>
                        
                        <label className="add-avatar" htmlFor="image">
                        {
                            file ? file.name : song.image && <img src={require(`../../uploads/songs/image/${song.image}`)} height="30px" />
                        }
                        </label>

                        <form onSubmit={e=> onSubmit(e) } className="avatarForm">
                            <input type="file" name="image" id="image" onChange={e=>fileSelectHandler(e)}/>
                            <label htmlFor="image" className="fileInput" >{fileName}</label>
                        </form>
                        
                        

                        <Alert />
                        {
                            fileName !== 'Choose file' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("File cannot be empty.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setImageInputView(!imageInputView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the image.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right" onClick={e=> onSubmit(e) }>Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setImageInputView(!imageInputView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddSongImage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    addSongImage: PropTypes.func.isRequired
}

export default connect(null, {setAlert, addSongImage})(AddSongImage);