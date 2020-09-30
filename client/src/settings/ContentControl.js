import React, { Fragment } from 'react';


const ContentControl = () => {



    return (
        <Fragment>
            <div className="content-box-settings">
                    <div className="content-settings">
                        
                        <div className="top-bar"> Content control </div>
                        <div className="settings-info">
                            Customize features up to you.
                        </div>
                        <div className="settings-info">
                            Website features can be now under your control.
                        </div>
                        
                        <img src={require('../style/soon.png')} className="comming-soon" />

                    </div>
                </div>
        </Fragment>
    )
}
export default ContentControl;