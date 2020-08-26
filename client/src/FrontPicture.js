import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';

const FrontPicture = ({songs, labelUrl, authorContent, setAuthorContent, frontAuthors, setFrontAuthors, frontAuthor, setFrontAuthor }) => {

    const scrollTo = useRef(null)
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [scrollTo])

    return (
        <Fragment>
        {
            authorContent == null ? "loading..." : <Fragment>
        
        <div className="featureFrontAuthor" ref={scrollTo}>
             <button type="button" className="x-top-right" onClick={e=>{setFrontAuthors(true), setFrontAuthor(false), setAuthorContent([])}}>X</button>
            
            
                <div className="front-author-picture">
                    {
                        authorContent.images[0] ? <Link to={`/authors/${authorContent._id}`}><img src={require(`../uploads/authors/image/${authorContent.images[0].image}`)} /></Link> : <Link to={`/authors/${authorContent._id}`}><img src={require("./style/guitar.png")} /></Link>
                    }
                </div>
                <div className="front-author-songs"><p>album collection:</p><div className="toScrollIt">
                    {
                        authorContent.albums.length == 0 ? "no album yet..." : authorContent.albums.map(album => <Fragment key={album._id}>
                            <div className="front-author-album" key={album._id}>
                                <Link to={`/authors/${authorContent._id}/album/${album._id}`}> {album.album} ({album.year}){ReactHtmlParser('&nbsp')} {album.images[0] ? <img src={require(`../uploads/authors/album/${album.images[0].image}`)} /> : <img src={require("./style/guitar.png")} />} </Link>
                            </div>
                        </Fragment>)
                            
                    }
                    </div>
                </div>
                            <div className="front-author-followers">
                                <img src={require('./style/follow.png')} height="32px" />{ReactHtmlParser('&nbsp')}  {authorContent.subscribes == 1 ? authorContent.subscribes + " follower" : authorContent.subscribes + " followers"}
                            </div>
                            <div className="front-author-metric">
                                {
                                    ReactHtmlParser(authorContent.bio)
                                }
                            </div>
        </div>

            </Fragment>
        }
        
        </Fragment>
    );
}
export default FrontPicture;