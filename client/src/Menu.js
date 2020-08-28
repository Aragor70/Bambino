import React, { Fragment, useState } from 'react';
import {Link, BrowserRouter as Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from './actions/auth';
import PropTypes from 'prop-types';

const Menu = ({auth: {user, isAuthenticated, loading}, logout, menu, setMenu, history}) => {

    

    const authMenu = (
        <div className="user-menu">
            <div className="user-menu-nickname">
            
                {user ? <>{user.avatar.charAt(0) == "/" ? <img src={user.avatar} className="add-mrg-right" height="90%" /> : <img src={require(`../uploads/avatar/${user.avatar}`)} className="add-mrg-right" height="90%" />}{user.name}</> : "nickname"}
            </div>
                <hr />
            <Link to='/' onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                home
            </div></Link>
            
            <Link to="top_songs" onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                top list
            </div></Link>
            <Link to="/library" onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                my library
            </div></Link>
            <hr />
            {
            //    <Link to ="/my_uploading"><div className="user-menu-btn">
            //    my uploading
            //    </div></Link>
            }
            <Link to='/history' onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                history
            </div></Link>

            <Link to='/profile' onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                my account
            </div></Link>
            <Link to='/settings' onClick={e=>setMenu(!menu)}><div className="user-menu-btn">
                settings
            </div></Link>
            <Link><div className="user-menu-btn" onClick={e=>{logout(), setMenu(!menu), history.push('/')}}>
                logout
            </div></Link>
        </div>
        )
        
        const guestMenu = (
        <div className="navi-menu">
            <div className="navi-login"><Link to='/' onClick={e=>setMenu(!menu)}> OnLoud.uk</Link></div>
            <Link to='/login' onClick={e=>setMenu(!menu)}><div className="navi-login"> log in .</div></Link>
            <Link to='/register' onClick={e=>setMenu(!menu)}><div className="navi-signin"> sign in .</div></Link>
            <hr />
            <Link to='/newsletter' onClick={e=>setMenu(!menu)}><div className="navi-other"> newsletter .</div></Link>
            <Link to='/about' onClick={e=>setMenu(!menu)}><div className="navi-other"> about .</div></Link>
            <div className="navi-other"> support .</div>
            <div className="navi-other"> contact us .</div>
            <hr />
            <div className="logos">

                <img src={require("./style/logos.png")} />
                <img src={require("./style/brands-and-logotypes.png")} />
                <img src={require("./style/brands-and-logotypes (1).png")} />

            </div>
            
        </div>
        )

    return (
        <>
            
            {!loading && (
                <Fragment>
                    {isAuthenticated ? authMenu : guestMenu}
                </Fragment>
            )}
            
        </>
    )
}
Menu.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Menu));