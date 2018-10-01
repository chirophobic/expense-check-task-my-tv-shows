import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faPlus, faThumbsDown, faThumbsUp, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import debounce from 'debounce';
import ISO6391 from 'iso-639-1';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import PosterImage from '../../shared-components/PosterImage';
import SearchBox from '../../shared-components/SearchBox';
import Spinner from '../../shared-components/Spinner';
import Cursor from '../../utils/cursor';
import './index.css';

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
            <div className="movie__cover">
                <PosterImage alt={movie.name} path={movie.poster_path} width={300}/>
            </div>
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
        this.urls = {search: '/search/tv', list: '/discover/tv'};
        this.state = {
            movies: [],
            searchTerm: '',
            isLoading: false,
            cursor: new Cursor(this.urls.list),
        };
    }

    componentDidMount () {
        this.loadMore();
    }

    loadMore () {
        this.setState({isLoading: true}, () => {
            this.state.cursor.nextPage().then(shows => this.handleApiSuccess(shows));
        });
    }

    onSearch (searchTerm) {
        const newSearchCursor = new Cursor(this.urls.search, {query: searchTerm});
        const newDefaultCursor = new Cursor(this.urls.list);
        this.setState({
            searchTerm,
            movies: [],
            cursor: searchTerm ? newSearchCursor : newDefaultCursor,
        }, this.loadMore);
    }

    handleApiSuccess (shows) {
        this.setState({isLoading: false, movies: [...this.state.movies, ...shows]});
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
