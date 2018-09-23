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
        listMovies().then(movies => {
            this.setState({movies: this.mapMoviesToUsableType(movies)});
        });
    }

    addToWatchList (movie) {
        this.props.watchList.add(movie);
        this.setState({movies: this.mapMoviesToUsableType(this.state.movies)});
    }

    addToFavourites (movie) {
        this.props.favourites.remove(movie);
        this.setState({movies: this.mapMoviesToUsableType(this.state.movies)});
    }

    removeFromWatchList (movie) {
        this.props.watchList.add(movie);
        this.setState({movies: this.mapMoviesToUsableType(this.state.movies)});
    }

    removeFromFavourites (movie) {
        this.props.favourites.remove(movie);
        this.setState({movies: this.mapMoviesToUsableType(this.state.movies)});
    }

    mapMoviesToUsableType (movies) {
        return movies.map(movie => {
            return {
                ...movie,
                is_in_watch_list: this.props.watchList.contains(movie),
                is_in_favourites: this.props.favourites.contains(movie),
            };
        });
    }

    render () {
        return (
            <MovieList movies={this.state.movies}
                       addToWatchList={this.addToWatchList.bind(this)}
                       removeFromWatchList={this.removeFromWatchList.bind(this)}
                       addToFavourites={this.addToFavourites.bind(this)}
                       removeFromFavourites={this.removeFromFavourites.bind(this)}/>
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
