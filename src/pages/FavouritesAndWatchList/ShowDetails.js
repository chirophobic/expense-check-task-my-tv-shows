import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import config from '../../config';
import './index.css';
import SimilarShows from './SimilarShows';

class ShowDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {extraDetails: {}};
    }

    componentDidMount () {
        const params = {params: {'api_key': config.apiToken}};
        axios.get(`${config.apiBaseUrl}/tv/${this.props.movie.id}`, params)
             .then(response => this.setState({extraDetails: response.data}));
    }

    renderLatestAndNextEpisodes () {
        const previous = this.state.extraDetails.last_episode_to_air;
        const next = this.state.extraDetails.next_episode_to_air;
        return (
            <div className="episodes">
                {next && (
                    <div className="episodes__ep">
                        <div className="episodes__ep__header">Next Episode</div>
                        <div className="episodes__ep__title">{next.name}</div>
                        <div className="episodes__ep__date">{next.air_date}</div>
                        <p className="episodes__ep__description">{next.overview || 'No description'}</p>
                    </div>
                )}

                {previous && (
                    <div className="episodes__ep">
                        <div className="episodes__ep__header">Previous Episode</div>
                        <div className="episodes__ep__title">{previous.name}</div>
                        <div className="episodes__ep__date">{previous.air_date}</div>
                        <p className="episodes__ep__description">{previous.overview || 'No description'}</p>
                        <div className="episodes__ep__rating">Rating: {previous.vote_average * 10}%</div>
                    </div>
                )}
            </div>
        );
    }

    render () {
        const movie = this.props.movie;
        return (
            <li className="liked-shows__show">
                <div className="liked-shows__show__title">{movie.name} ({movie.first_air_date.slice(0, 4)})</div>
                <div className="liked-shows__show__actions">
                    <a href={`https://www.themoviedb.org/tv/${movie.id}`}
                       target="_blank"
                       rel="noopener noreferrer">
                        More Information
                    </a>
                    <FontAwesomeIcon title="Remove from Favourites" icon={faTrashAlt}/>
                </div>
                <p className="liked-shows__show__description">{movie.overview}</p>
                {this.state.extraDetails.last_episode_to_air && this.renderLatestAndNextEpisodes()}
                <SimilarShows show={movie}/>
            </li>
        );
    }
}

ShowDetails.propTypes = {
    movie: PropTypes.object,
};

export default ShowDetails;
