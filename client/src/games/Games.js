import React, { Fragment } from 'react';

import '../style/balloons/style.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';


const Games = () => {

    return (
        <Fragment>
            <div className="shield">
            <div className="games">
                <div className="game-slider game-grid"> Slider </div>
                

                <Link to="/games/balloons" className="game0 game-grid"> Balloon game </Link>
                {
                    // <Link to="/games/balloons" className="game1 game-grid"> Balloon game </Link>
                    // <div className="game-post-section game-grid">Posts</div>
                }
                
                
                
            </div>
            
            
            </div>
        </Fragment>
    );
}
export default Games;