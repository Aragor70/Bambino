import React from 'react';


const PictureProfileMain = () => {


    return (
        <div className="featureOfficial">
            <PictureComposition official={official} pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                
                {
                    pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                }
            
        </div>
    )
}
export default PictureProfileMain;