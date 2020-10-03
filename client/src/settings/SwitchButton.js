import React, { Fragment, useEffect, useState } from 'react';



const SwitchButton = ({ handleClick, styles, value }) => {


    return (
        <Fragment>
            <label className="switch-button" htmlFor="switch-box" onClick={e=> handleClick(e)}>
                <span className="switch" style={styles}>{value}</span>
            </label>
                
        </Fragment>
    )
}

export default SwitchButton;