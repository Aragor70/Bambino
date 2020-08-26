import React, { Fragment } from 'react';
import PictureScreen from './PictureScreen';




const PictureComposition = ({official = false, pictures, pageNumbers, setCurrentPage, lastPictureIndex, setPictureContent, pictureContent, pictureScreen, setPictureScreen}) => {


    return (
        <Fragment>
        {
            official == true && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture official${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }    
        {
            pictures.length == 1 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture uno${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 2 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture duo${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 3 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture trio${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 4 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture quarte${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 5 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture quinto${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 6 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture sexto${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 7 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture septimo${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 8 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture octavo${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 9 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture noveno${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        {
            pictures.length == 10 && official == false && <Fragment>
            {
                pictures && pictures.map((picture, index) => <Fragment key={picture._id}>
                    <div className={`picture p${index}`}>
                        <img src={require(`../../uploads/picture/${picture.fileName}`)} onClick={e => {setPictureScreen(!pictureScreen), setPictureContent({index:index, fileName: picture.fileName})}} />
                    </div>

                {
                    pictureScreen && <PictureScreen lastIndex={lastPictureIndex} pictures={pictures} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                }   
                </Fragment>)
            }
            </Fragment>
        }
        </Fragment>
    );
}
export default PictureComposition;