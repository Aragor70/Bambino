import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from './actions/profile';
import { getNewsletters } from './actions/newsletter';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';
import General from './settings/General';
import History from './settings/History';
import Newsletter from './Newsletter';
import CreateProfile from './CreateProfile';
import NoProfile from './NoProfile';
import AddPersonal from './settings/AddPersonal';
import Security from './settings/Security';
import Connections from './settings/Connections';


const Control = ({getCurrentProfile, getNewsletters, auth:{user}, profile, newsletter:{newsletters, newsletter}}) => {

    useEffect(() => {
        getCurrentProfile()
        getNewsletters()
            
    }, [getCurrentProfile, newsletter])
    
    const currentEmail = newsletters.map(newsletter => newsletter.user.toString() == user._id ? (newsletter._id, newsletter.email) : null);
    
    const filterEmail = currentEmail.filter(email => email)
    
    const [personalView, setPersonalView] = useState(false);

    return (
        <Fragment>
            <div className="shield-personal">
            <div className="settings-content">
                
                            <Router>
                            <div className="marks-settings">
                                <div className="marks">
                                
                                <Link to={`/settings`}><div className="mark"> General </div></Link>
                                <Link to={`/settings/tab_log`}><div className="mark">Account history</div></Link>
                                <Link to={`/settings/security`}><div className="mark">Password and security</div></Link>
                                <Link to={`/settings/connections`}><div className="mark">Connections</div></Link>
                                    <div className="mark">Content Control</div>
                                    
                                </div>
                                
                            </div>
                            
                            <Switch>
                            

                            
                            <Route exact path={"/settings"}>
                            <Fragment>
                                <General profile={profile} user={user} newsletters={newsletters} currentEmail={filterEmail} personalView={personalView} setPersonalView={setPersonalView} />
                                
                            </Fragment>
                            </Route>
                            <Route exact path={"/settings/tab_log"}>
                            <Fragment>
                                <History profile={profile} user={user} personalView={personalView} setPersonalView={setPersonalView} />
                            </Fragment>
                            </Route>
                            
                            <Route exact path={"/settings/security"}>
                            <Fragment>
                                <Security profile={profile} user={user} />
                            </Fragment>
                            </Route>

                            <Route exact path={"/settings/connections"}>
                            <Fragment>
                                <Connections profile={profile} user={user} />
                            </Fragment>
                            </Route>
                            
                            <Route exact path="/settings/profile_create" component={CreateProfile} />
                            
                            </Switch>
                        
                        
                            </Router>
                        {
                            personalView && <Fragment><AddPersonal personalView={personalView} setPersonalView={setPersonalView} profile={profile}  /></Fragment>
                        }
                        {
                            personalView && <div className="addshadow"></div>
                        }
                            
            </div>
            </div>
               
        </Fragment>
    );
}
Control.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getNewsletters: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    newsletter: state.newsletter
});
export default connect(mapStateToProps, {getCurrentProfile, getNewsletters})(Control);