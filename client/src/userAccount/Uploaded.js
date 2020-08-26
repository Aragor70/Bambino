import React, { useEffect, useState, Fragment } from 'react';
import { getSongs } from '../actions/song';
import { connect } from 'react-redux';
import { getViews } from '../actions/profile';
import moment from 'moment';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { getAuthors } from '../actions/author';
import { Link } from 'react-router-dom';

const Uploaded = ({getSongs, getAuthors, getViews, auth:{user}, author:{authors}, song:{songs, loading}, profile:{views}}) => {

    useEffect(()=>{
        getSongs()
        getViews()
        getAuthors()
    }, []);

  
    return (
      <div>

      </div>
        
    );
}
const mapStateToProps = state => ({
    auth: state.auth,
    song: state.song,
    profile: state.profile,
    author: state.author
})
export default connect(mapStateToProps, {getSongs, getViews, getAuthors})(Uploaded);