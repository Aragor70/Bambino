import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import PictureScreen from './PictureScreen';
import PictureComposition from './PictureComposition';


const ProfilePictures = ({ profile, setProfileNav, profileNav, pictureLimit='10', official=false}) => {


    const [currentPage, setCurrentPage] = useState(1);
    const picturesPerPage = pictureLimit;
    const total = profile.pictures.length

    const lastIndex = currentPage * picturesPerPage;
    const firstIndex = lastIndex - picturesPerPage;

    const pictures = profile.pictures.slice(firstIndex, lastIndex)

    const lastPage = total / picturesPerPage;

    const lastPictureIndex = total - lastIndex

    const pageNumbers = [];

    for(let i = 0; i < lastPage; i++){
        pageNumbers.push(i)
    }

    const [pictureScreen, setPictureScreen] = useState(false)
    const [pictureContent, setPictureContent] = useState({
        index: '',
        fileName: ''

    })
        

    return (
        profile && <Fragment>
        
                {
                    official == true && <Fragment>
                        <div className="featureOfficial">
                            <PictureComposition official={official} pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                                {
                                    pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                                }
                            <div className="officialArrows" >
                                {
                                    pageNumbers.map(number => <div className="officialArrow" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                                }
                            </div>
                        </div>
                    </Fragment>
                }
        
        
        
        <div className="shield" onClick={e=> setProfileNav(false)}>
                
                {
                    pictures.length == 1 && official == false && <Fragment>
                    <div className="feature1">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 2 && official == false && <Fragment>
                    <div className="feature2">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }    
                {
                    pictures.length == 3 && official == false && <Fragment>
                    <div className="feature3">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }    
                {
                    pictures.length == 4 && official == false && <Fragment>
                    <div className="feature4">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 5 && official == false && <Fragment>
                    <div className="feature5">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>
                    </Fragment>
                }
                {
                    pictures.length == 6 && official == false && <Fragment>
                    <div className="feature6">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 7 && official == false && <Fragment>
                    <div className="feature7">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 8 && official == false && <Fragment>
                    <div className="feature8">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 9 && official == false && <Fragment>
                    <div className="feature9">
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                                
                            {
                                pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                            }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                    </div>

                    </Fragment>
                }
                {
                    pictures.length == 10 && official == false && <Fragment>
                    <div className="pictures-content">
                        
                        <PictureComposition pictures={pictures} lastPictureIndex={lastPictureIndex} setPictureContent={setPictureContent} pictureContent={pictureContent} setPictureContent={setPictureContent} pictureScreen={pictureScreen} setPictureScreen={setPictureScreen} />
                    
                        {
                            pictureScreen && <div className="addshadow" onClick={e=> setPictureScreen(false)}></div>
                        }
                        <div className="pageNumbers-picture" >
                            {
                                pageNumbers.map(number => <div className="pageNumber-picture" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>

                    </div>
                    </Fragment>
                }
                
                
        </div>
        </Fragment>
    );
}
ProfilePictures.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfilePictures;