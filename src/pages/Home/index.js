import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faPlus, faThumbsDown, faThumbsUp, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import debounce from 'debounce';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import config from '../../config';
import SearchBox from '../../shared-components/SearchBox';
import './index.css';
import Spinner from '../../shared-components/Spinner';
import ISO6391 from 'iso-639-1';

function LoadMore ({onLoadMore}) {
    return (
        <div className="load-more">
            <div onClick={onLoadMore} className="load-more__button">Load More</div>
        </div>
    );
}

function Movie ({movie, addToWatchList, removeFromWatchList, addToFavourites, removeFromFavourites}) {
    const addOrRemoveWatchList = movie.is_in_watch_list ? removeFromWatchList : addToWatchList;
    const addOrRemoveFromFavourites = movie.is_in_favourites ? removeFromFavourites : addToFavourites;

    const language = ISO6391.getName(movie.original_language);
    const year = movie.first_air_date.slice(0, 4);

    return (
        <li className="movie">
            <img className="movie__cover"
                 src={`${config.imageBaseUrl}w300${movie.poster_path}`}
                 alt={movie.title}/>
            <div className="movie__details">
                <div className="movie__details__title">{movie.name} ({year})</div>
                <div className="movie__details__rating">
                    Rating: {movie.vote_average * 10}%
                </div>
                <div className="movie__details__tags">
                    <span>{language}</span>
                </div>
            </div>
            <div className="movie__actions">
                <div className="movie__actions__action"
                     title={movie.is_in_watch_list ? 'Remove from Watch List' : 'Add to Watch List'}
                     onClick={() => addOrRemoveWatchList(movie)}>
                    <FontAwesomeIcon icon={movie.is_in_watch_list ? faTrashAlt : faPlus}/>
                </div>
                <div className="movie__actions__action"
                     title={movie.is_in_favourites ? 'Remove from Favourites' : 'Add to Favourites'}
                     onClick={() => addOrRemoveFromFavourites(movie)}>
                    <FontAwesomeIcon icon={movie.is_in_favourites ? faThumbsDown : faThumbsUp}/>
                </div>
                <div className="movie__actions__action" title="Watch Trailer">
                    <FontAwesomeIcon icon={faYoutube}/>
                </div>
            </div>
        </li>
    );
}

class Home extends Component {
    constructor (props) {
        super(props);
        this.onSearch = debounce(this.onSearch, 300);
        this.state = {movies: [], searchTerm: '', page: 1, isLoading: false};
        this.baseQueryParams = {
            'api_key': config.apiToken,
        };
    }

    componentDidMount () {
        this.listMovies();
    }

    listMovies () {
        const params = {params: {...this.baseQueryParams, page: this.state.page}};
        this.setState({isLoading: true});
        axios.get(`${config.apiBaseUrl}/discover/tv`, params)
             .then(response => this.handleApiSuccess(response));
    }

    searchMovies () {
        const options = {params: {...this.baseQueryParams, query: this.state.searchTerm, page: this.state.page}};
        this.setState({isLoading: true});
        axios.get(`${config.apiBaseUrl}/search/tv`, options)
             .then(response => this.handleApiSuccess(response));
    }

    loadMore () {
        this.setState({page: this.state.page + 1}, () => {
            if (this.state.searchTerm) {
                this.searchMovies();
            } else {
                this.listMovies();
            }
        });
    }

    onSearch (searchTerm) {
        this.setState({searchTerm, movies: [], page: 1}, this.loadMore);
    }

    handleApiSuccess (response) {
        console.log(response.data.results);
        this.setState({isLoading: false, movies: [...this.state.movies, ...response.data.results]});
    }

    mapMovieToUsableType (movie) {
        return {
            ...movie,
            is_in_watch_list: this.props.watchList.contains(movie),
            is_in_favourites: this.props.favourites.contains(movie),
        };
    }

    render () {
        const movies = this.state.movies.map(movie => this.mapMovieToUsableType(movie));
        return (
            <Fragment>
                <SearchBox onSearch={e => this.onSearch(e.target.value)}/>
                <ul className="movies-list">
                    {movies.map(movie => <Movie key={movie.id}
                                                movie={movie}
                                                addToWatchList={this.props.watchList.add}
                                                removeFromWatchList={this.props.watchList.remove}
                                                addToFavourites={this.props.favourites.add}
                                                removeFromFavourites={this.props.favourites.remove}/>)}
                </ul>
                {this.state.isLoading && <div style={{textAlign: 'center'}}><Spinner/></div>}
                {!this.state.isLoading && <LoadMore onLoadMore={() => this.loadMore()}/>}
            </Fragment>
        );
    }
}

const shape = {
    add: PropTypes.func,
    remove: PropTypes.func,
    contains: PropTypes.func,
};

Home.propTypes = {
    watchList: PropTypes.shape(shape),
    favourites: PropTypes.shape(shape),
};

export default Home;
