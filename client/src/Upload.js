import React, { Fragment, useEffect, useState } from 'react';


import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from './actions/alert';
import { Add_File, Profile_Error } from './actions/types';
import { addFile } from './actions/profile';

const Upload = ({ profile, setAlert, addFile }) => {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    
    const [uploadedFile, setUploadedFile] = useState('');
    
    const fileSelectHandler = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        addFile(file)

        setUploadedFile({name: fileName, path: `/uploads/${file.name}`});
        setFileName('Choose File');
    }    
    console.log(uploadedFile)
    return (
        <Fragment>
            <form onSubmit={e=> onSubmit(e) } className="fileForm">
                <input type="file" name="myfile" id="myfile" onChange={e=>fileSelectHandler(e)}/>
    <label htmlFor="myfile" className="fileInput" >{fileName}</label>
                <input type="submit" value="upload" />
            </form>
        </Fragment>
    );
}
Upload.propTypes = {
    profile: PropTypes.object.isRequired,
    addFile: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    profile: state.profile
})
export default connect(mapStateToProps, { setAlert, addFile })(Upload);