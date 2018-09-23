import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function SearchBox ({onSearch}) {
    return (
        <div className="search">
            <input onChange={onSearch}
                   className="search__input"
                   placeholder="Search"
                   type="search"/>
        </div>
    );
}

SearchBox.propTypes = {
    onSearch: PropTypes.func,
};

export default SearchBox;
