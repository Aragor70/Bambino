import React, { Fragment, useState, useRef, useEffect } from 'react';
import {addAlbum} from '../actions/author';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import {setAlert} from '../actions/alert';

const AddAlbum = ({authorId, author:{author}, addAlbum, setAlert, albumView, setAlbumView}) => {

    

    const [formData, setFormData] = useState({
        album: '',
        year: ''
    });
    const {album, year} = formData;

    const [field, setField] = useState({
        default: true,
        submit: false
    });
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        addAlbum(authorId, formData);
        setAlbumView(!albumView);
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
                            New album
                        </label>
                        <button type="button" className="x-top-right" onClick={e=>setAlbumView(!albumView)}>X</button>
                <form onSubmit={e=>onSubmit(e)}>
                {
                    field.default && <Fragment>
                        
                        <label className="song-info">
                            Add new album to {author}'s profile.
                        </label>    
                        <label className="song-info">Please insert album singular.</label>
                        
                        <label className="inputSongLabel"><input type="text" value={album} name="album" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .album"  /></label>
                        <label className="inputSongLabel"><input type="text" value={year} name="year" onChange={e=>onChange(e)}className="inputSongInfo" placeholder=" .year"  /></label>
                        
                        <Alert />
                        {
                            album !== '' || year !== '' ? <button type="button" className="nextButton add-mrg-right" onClick={e=>{setField({default:!field.default, submit:!field.submit})}}>Next -></button> : <button type="button" className="nextButton add-mrg-right" onClick={e=>{setAlert("Name and year are required values.", "danger")}}>Next -></button>
                        }


                        <button type="button" className="nextButton" onClick={e=>setAlbumView(!albumView)}>Cancel</button>
                    </Fragment>
                }
                {
                    field.submit && <Fragment>
                        <label className="song-info">
                            Have you finished the customization?
                        </label>
                        <label className="song-info">
                            Please submit the album.
                        </label>
                        <button type="submit" className="nextButton add-mrg-right">Submit</button>
                        <button type="button" className="nextButton" onClick={e=>{setField({submit:!field.submit, default:!field.default})}}>Go back</button>
                        <button className="nextButton" onClick={e=>setAlbumView(!albumView)}>Cancel</button>
                    </Fragment>
                }
                </form>
                
            </div>
        </Fragment>
    );
}
AddAlbum.propTypes = {
    addAlbum: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired
}
export default connect(null, {addAlbum, setAlert})(AddAlbum);