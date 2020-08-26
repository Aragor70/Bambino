import React, { Fragment, useEffect } from 'react';
import {getGithubRepos} from '../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileGithub = ({username, repos, getGithubRepos}) => {

    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos]);

    return (
        <Fragment>
            <div className="about-label"> Github repository
                {
                    repos == null ? (<div className="about-info">No repository.</div>) : (<Fragment>
                        {
                            repos.map(repo=> (
                            <div className="about-info" key={repo.id}><a href={repo.html_url}>{repo.name}</a> </div>))
                            
                        }
                    </Fragment>)
                }
            </div>
        </Fragment>
    );
}
ProfileGithub.PropTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
}
const mapStatToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStatToProps, {getGithubRepos})(ProfileGithub);