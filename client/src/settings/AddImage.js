import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';
import {updateUser, addAvatar} from '../actions/auth';


const AddImage = ({setAlert, imageView, setImageView, user, addAvatar}) => {


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
        addAvatar(file);

        setUploadedFile({name: fileName, path: `/uploads/avatar/${file.name}`});
        setFileName('Choose File');

        setImageView(false);
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
                            Profile avatar image
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setImageView(!imageView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Choose image file as avatar.
                        </label>
                        
                        <label className="add-avatar" htmlFor="avatar">
                        {
                            file ? file.name : user.avatar && user.avatar.charAt(0) == "/" ? <img src={user.avatar} height="30px" /> : <img src={require(`../../uploads/avatar/${user.avatar}`)} height="30px" />
                        }
                        </label>

                        <form onSubmit={e=> onSubmit(e) } className="avatarForm">
                            <input type="file" name="avatar" id="avatar" onChange={e=>fileSelectHandler(e)}/>
                            <label htmlFor="avatar" className="fileInput" >{fileName}</label>
                        </form>
                        
                        

                        <Alert />
                        {
                            fileName !== 'Choose file' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("File cannot be empty.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setImageView(!imageView)}>Cancel</button>
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
                        <button className="nextButton" onClick={e=>setImageView(!imageView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddImage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addAvatar: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
    
}
export default connect(null, {setAlert, addAvatar})(AddImage);