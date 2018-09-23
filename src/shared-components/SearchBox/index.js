import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function SearchBox ({value, onSearch}) {
    return (
        <div className="search">
            <input onChange={onSearch}
                   value={value}
                   className="search__input"
                   placeholder="Search"
                   type="search"/>
        </div>
    );
}

SearchBox.propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func,
};

export default SearchBox;
