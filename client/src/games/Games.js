import React, { Fragment } from 'react';

import '../style/balloons/style.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';


const Games = () => {

    return (
        <Fragment>
            <div className="shield-personal">
            <div className="games-content">
                
                <Link to="/games/balloons" className="game"> Balloon game </Link>
                <Link to="/games/counting" className="game"> Counting game </Link>
                
                
                
                
            </div>
            
            
            </div>
        </Fragment>
    );
}
export default Games;