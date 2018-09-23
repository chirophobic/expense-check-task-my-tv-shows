import React, {Component} from 'react';
import MovieList from '../../shared-components/MovieList';

class Favourites extends Component {
    render () {
        return (
            <MovieList movies={this.props.movies}
                       addToWatchList={() => {}}
                       addToFavourites={() => {}}
                       removeFromFavourites={() => {}}
                       removeFromWatchList={() => {}} />
        )
    }
}

export default Favourites;
