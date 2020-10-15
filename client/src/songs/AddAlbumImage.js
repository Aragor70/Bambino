import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import { addAlbumImage } from '../actions/author';


const AddAlbumImage = ({setAlert, imageInputView, setImageInputView, author_id, album, addAlbumImage}) => {

    

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
        addAlbumImage(author_id, album._id, file);

        setUploadedFile({name: fileName});
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
            <div className="songInputView" ref={scrollTo}>
                        <label className="song-label">
                            Album picture creator
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
                            file ? file.name : album.image && <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/author/album/image/${album.image}`} height="30px" />
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
AddAlbumImage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    addAlbumImage: PropTypes.func.isRequired
}

export default connect(null, {setAlert, addAlbumImage})(AddAlbumImage);