import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import SearchBox from '../../shared-components/SearchBox';
import './index.css';
import ShowDetails from './ShowDetails';

class FavouritesAndWatchList extends Component {
    constructor (props) {
        super(props);
        this.state = {search: ''};
    }

    onSearch (event) {
        this.setState({search: event.target.value});
    }

    matchesSearch (movie) {
        return movie.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0;
    }

    render () {
        const movies = this.props.movies.filter(movie => !this.state.search || this.matchesSearch(movie));
        return (
            <Fragment>
                <SearchBox onSearch={e => this.onSearch(e)}/>
                {!movies.length && <div style={{textAlign: 'center'}}>There are no shows in this list.</div>}
                <ul className="liked-shows">
                    {movies.map(movie => <ShowDetails key={movie.id} movie={movie} {...this.props}/>)}
                </ul>
            </Fragment>
        );
    }
}

FavouritesAndWatchList.propTypes = {
    movies: PropTypes.array,
    removeFromList: PropTypes.func,
    removeIcon: PropTypes.element,
    removeLabel: PropTypes.string,
};

export default FavouritesAndWatchList;
