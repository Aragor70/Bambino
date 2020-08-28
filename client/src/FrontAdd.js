import React, { Fragment } from 'react';


const FrontAdd = ({frontAdd, setFrontAdd, quoteView, setQuoteView, songInputView, setSongInputView, authorInputView, setAuthorInputView}) => {
    
    
    return (<Fragment>
        
        <div className="front-adding-content">
            
            <button type="button" className="x-top-right" onClick={e=>setFrontAdd(!frontAdd)}>X</button>
            
            <div className="front-post-button">
                <button className="front-button" onClick={e=>{setQuoteView(!quoteView), setFrontAdd(false)}}>New Quote</button>
            </div>
            
            <div className="front-adding-describe">describe</div>

            
            <div className="front-song-button">
                <button className="front-button" onClick={e=>{setSongInputView(!songInputView), setFrontAdd(false)}}>New Song</button>
                
            </div>
            <div className="front-adding-describe" >describe</div>

            <div className="front-author-button">
                <button className="front-button" onClick={e=>{setAuthorInputView(!authorInputView), setFrontAdd(false)}}>New Author</button>
                
            </div>
            <div className="front-adding-describe" >describe</div>


            
        </div>
        </Fragment>
    )
}
export default FrontAdd;