import {faPlus, faTrashAlt, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';
import './index.css';

function Movie ({movie, addToWatchList, addToFavourites}) {
    return (
        <li className="movie">
            <img className="movie__cover"
                 src={`${config.imageBaseUrl}w300${movie.poster_path}`}
                 alt={movie.title}/>
            <div className="movie__title">{movie.title}</div>
            <div className="movie__rating">{movie.vote_average}</div>
            <div className="movie__actions">
                <div className="movie__actions__action"
                     title="Add to Watch List"
                     onClick={() => addToWatchList(movie)}>
                    <FontAwesomeIcon icon={movie.is_in_watch_list ? faTrashAlt : faPlus}/>
                </div>
                <div className="movie__actions__action"
                     title="Add to Favourites"
                     onClick={() => addToFavourites(movie)}>
                    <FontAwesomeIcon icon={movie.is_in_favourites ? faThumbsDown : faThumbsUp}/>
                </div>
                <div className="movie__actions__action" title="Watch Trailer">
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
            </div>
        </li>
    );
}

function MovieList (props) {
    return (
        <ul className="movies-list">
            {props.movies.map(movie => <Movie key={movie.id} movie={movie} {...props}/>)}
        </ul>
    );
}

MovieList.propTypes = {
    movies: PropTypes.array,
    addToWatchList: PropTypes.func,
    removeFromWatchList: PropTypes.func,
    addToFavourites: PropTypes.func,
    removeFromFavourites: PropTypes.func,
};

export default MovieList;
