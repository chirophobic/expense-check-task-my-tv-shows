import axios from 'axios';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import config from '../../config';
import './SimilarShows.css';

class SimilarShows extends Component {
    constructor (props) {
        super(props);
        this.state = {similar: [], isLoading: false};
    }

    componentDidMount () {
        const params = {params: {'api_key': config.apiToken}};
        axios.get(`${config.apiBaseUrl}/tv/${this.props.show.id}/similar`, params)
             .then(response => this.setState({similar: response.data.results}));
    }

    render () {
        return (
            <div className="similar-shows">
                <div className="similar-shows__header">Similar Shows:</div>
                <ul>
                    {this.state.similar.map(show => <li key={show.id}>{show.name}</li>)}
                </ul>

            </div>
        );
    }
}

SimilarShows.propTypes = {
    show: PropTypes.object,
};

export default SimilarShows;
