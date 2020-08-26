import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import {addPicture} from '../actions/profile';


const AddPicture = ({setAlert, pictureView, setPictureView, user, addPicture}) => {

    const scrollTo = useRef(null)
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
        }
    }, [scrollTo])

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
        addPicture(file);

        setUploadedFile({name: fileName, path: `/uploads/picture/${file.name}`});
        setFileName('Choose File');

        setPictureView(false);
    }    
    
    return (
        <Fragment>
            <div className="songInputView" ref={scrollTo}>
                        <label className="song-label">
                            Profile gallery picture
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setPictureView(!pictureView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Choose picture file.
                        </label>
                        
                        

                        <form onSubmit={e=> onSubmit(e) } className="avatarForm">
                            <input type="file" name="picture" id="picture" onChange={e=>fileSelectHandler(e)}/>
                            <label htmlFor="picture" className="fileInput" >{fileName}</label>
                        </form>
                        
                        

                        <Alert />
                        {
                            fileName !== 'Choose file' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("File cannot be empty.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setPictureView(!pictureView)}>Cancel</button>
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
                        <button className="nextButton" onClick={e=>setPictureView(!pictureView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddPicture.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addPicture: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
    
}
export default connect(null, {setAlert, addPicture})(AddPicture);