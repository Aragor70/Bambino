import React, { Fragment, useRef, useEffect } from 'react';



const PictureScreen = ({ pictureContent:{index, fileName}, pictures, lastIndex, pictureScreen, setPictureScreen, setPictureContent }) => {

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
    
    const toTheNext = pictures.filter((picture, i) => i == index + 1)
    const toThePrev = pictures.filter((picture, i) => i == index - 1)

    const switchPrev = () => {
      if(index == 0){
        return setPictureContent({index: index, fileName})
      }
      setPictureContent({index: index - 1, fileName: toThePrev[0].fileName})
    }
    const switchNext = () => {
      if(index == 9){
        return setPictureContent({index: index, fileName})
      }
      setPictureContent({index: index + 1, fileName: toTheNext[0].fileName})

    }
    
    console.log(pictures)

    return (
        <Fragment>
            <div className="pictureScreen">

              {
                index !== 0 && <img className="prevPictureBtn" src={require('../style/prev.png')} onClick={e=>switchPrev()} />
              }
              <img ref={scrollTo} src={require(`../../uploads/picture/${fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:'', fileName: ''})}} />
              {
                index !== 9 && index !== pictures.length - 1 && <img className="nextPictureBtn" src={require('../style/next.png')} onClick={e=>switchNext()} />
              }
              
            </div>
        </Fragment>
    );
}
export default PictureScreen;