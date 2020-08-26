import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const Search = ({profile:{ user: { _id, name }}, searchValue, setSearchValue, liName, setLiName}) => {

    return (
        <Fragment>
            {name}
        </Fragment>
    );
}
Search.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Search;