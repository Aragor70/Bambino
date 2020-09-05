import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAuthors} from './actions/author';
import ReactHtmlParser from 'react-html-parser';

const FrontSubscribes = ({history, profile, author:{authors}, getAuthors, setList}) => {

    useEffect(() => {
        getAuthors();
    }, [])
    const theList = []
    profile.subscribes.filter(function(oldData){return authors.filter(function(newData){
        if(oldData.author == newData._id){
            theList.push({
                'author': newData.author,
                '_id': newData._id,
                'date': oldData.date,
                'image': newData.images[0] ? newData.images[0].image : null
            })
        }
    })})

    return (
        <Fragment>
            {
                theList.map((author, index) => <Fragment key={author._id}>
                    <div className="sub-row" key={author._id}>
                <Link to={`/authors/${author._id}`} onClick={e=>setList(false)}>{author.image !== null ? <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/author/image/${author.image}`} height="15.5px" /> : <img src={require("./style/guitar.png")} height="15.5px" />}{ReactHtmlParser('&nbsp')} {author.author}</Link>
                    </div>
                    </Fragment>)
            }
        </Fragment>
    )
}
FrontSubscribes.propTypes = {
    author: PropTypes.object.isRequired,
    getAuthors: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    author: state.author
})
export default connect(mapStateToProps, {getAuthors})(withRouter(FrontSubscribes));