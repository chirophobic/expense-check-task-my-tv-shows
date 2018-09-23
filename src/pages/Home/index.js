import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {listMovies} from '../../data/the-movie-db';
import MovieList from '../../shared-components/MovieList';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {movies: []};
        this.loadMovies();
    }

    loadMovies () {
        listMovies().then(movies => this.setState({movies: movies}));
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
            <MovieList movies={movies}
                       addToWatchList={this.props.watchList.add}
                       removeFromWatchList={this.props.watchList.remove}
                       addToFavourites={this.props.favourites.add}
                       removeFromFavourites={this.props.favourites.remove}/>
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
