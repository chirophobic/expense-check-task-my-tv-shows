import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';
import './index.css';

function PosterImage ({path, width, height, alt}) {
    const optionalStyles = height ? {height} : {};
    return (
        <div style={optionalStyles} className="poster-image">
            <img src={`${config.imageBaseUrl}w${width}${path}`} alt={alt}/>
        </div>
    );
}

PosterImage.propTypes = {
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.optional,
    alt: PropTypes.string.isRequired,
};

export default PosterImage;
