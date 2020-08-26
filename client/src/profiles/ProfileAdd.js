import React, { Fragment, useRef, useEffect } from 'react';


const ProfileAdd = ({profileAdd, setProfileAdd, postInputView, setPostInputView, songInputView, setSongInputView, authorInputView, setAuthorInputView, pictureInputView, setPictureInputView}) => {
    
    const scrollTo = useRef(null);
    useEffect(() => {
        if(scrollTo.current){
            scrollTo.current.scrollToView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
    }, [scrollTo])

    return (<Fragment>
        
        <div className="profile-adding-content" ref={scrollTo}>
            
            <button type="button" className="x-top-right" onClick={e=>setProfileAdd(!profileAdd)}>X</button>
            
            
            <div className="profile-picture-button">
                <button className="front-button" onClick={e=>setPictureInputView(!pictureInputView)}>New Picture</button>
            </div>
            
            <div className="profile-post-button">
                <button className="front-button" onClick={e=>setPostInputView(!postInputView)}>New Post</button>
            </div>
            
            <div className="profile-song-button">
                <button className="front-button" onClick={e=>setSongInputView(!songInputView)}>New Song</button>
                
            </div>

            <div className="profile-author-button">
                <button className="front-button" onClick={e=>setAuthorInputView(!authorInputView)}>New Author</button>
                
            </div>


            
        </div>
        </Fragment>
    )
}
export default ProfileAdd;