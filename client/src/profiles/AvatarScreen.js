import React, { Fragment, useRef, useEffect } from 'react';



const AvatarScreen = ({ pictureContent:{index, fileName}, pictureScreen, setPictureScreen, setPictureContent }) => {

//    const scrollTo = (ref) => {
//        if (ref) {
//          ref.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
//        }
//      }
    const scrollTo = useRef(null)
    useEffect(()=>{
      if(scrollTo.current){
        scrollTo.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
      }
    },[scrollTo])
    
    return (
        <Fragment>
            <div className="pictureScreen" ref={scrollTo} onClick={e=>setPictureScreen(false)}>
            
            {fileName.charAt(0) == "/" ? <img onClick={e => setPictureScreen(!pictureScreen)} src={fileName} height="100%" /> : <img onClick={e => setPictureScreen(!pictureScreen)} src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${fileName}`} height="100%" />}
             
            </div>
        </Fragment>
    );
}
export default AvatarScreen;