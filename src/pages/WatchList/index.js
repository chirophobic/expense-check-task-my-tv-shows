import React, {Component} from 'react';
import MovieList from '../../shared-components/MovieList';

class WatchList extends Component {
    mapMovieToUsableType (movie) {
        return {
            ...movie,
            is_in_watch_list: this.props.watchList.contains(movie),
            is_in_favourites: this.props.favourites.contains(movie),
        };
    }

    render () {
        const movies = this.props.movies.map(movie => this.mapMovieToUsableType(movie));
        return (
            <MovieList movies={movies}
                       addToWatchList={this.props.watchList.add}
                       removeFromWatchList={this.props.watchList.remove}
                       addToFavourites={this.props.favourites.add}
                       removeFromFavourites={this.props.favourites.remove}/>
        );
    }
}

export default WatchList;
