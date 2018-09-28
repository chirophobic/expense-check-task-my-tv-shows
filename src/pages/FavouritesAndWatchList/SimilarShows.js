import axios from 'axios';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import config from '../../config';
import './SimilarShows.css';
import PosterImage from '../../shared-components/PosterImage';

function SimilarShow ({show}) {
    return (
        <li className="similar-shows__list__show">
            <PosterImage alt={show.name} path={show.poster_path} width={200} height={250}/>
            {show.name}
        </li>
    );
}

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
                <ul className="similar-shows__list">
                    {this.state.similar.map(show => <SimilarShow key={show.id} show={show}/>)}
                </ul>
            </div>
        );
    }
}

SimilarShows.propTypes = {
    show: PropTypes.object,
};

export default SimilarShows;
