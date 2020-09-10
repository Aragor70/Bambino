import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const FrontNav = ({frontNav, setFrontNav, setHeaderGames, headerGames}) => {

    return (
        <Fragment>
            <div className="profile-nav">
        <Link to='/' ><div className="nav" onClick={e=> setFrontNav(!frontNav)}>HOME</div></Link>
        <Link to='/games' ><div className="nav" onClick={e=> {setFrontNav(!frontNav)}}>GAME ZONE</div></Link>
            </div>
        </Fragment>
    );
}
export default FrontNav;