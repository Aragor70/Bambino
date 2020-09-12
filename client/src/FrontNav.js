import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const FrontNav = ({frontNav, setFrontNav}) => {

    return (
        <Fragment>
            <div className="profile-nav">
        <Link to='/' ><div className="nav" onClick={e=> setFrontNav(!frontNav)}>HOME <img src={require('./style/home-run.png')} height="28px" /></div></Link>
        <Link to='/games' ><div className="nav" onClick={e=> {setFrontNav(!frontNav)}}>GAME ZONE <img src={require('./style/videogame.png')} height="28px" /></div></Link>
            </div>
        </Fragment>
    );
}
export default FrontNav;