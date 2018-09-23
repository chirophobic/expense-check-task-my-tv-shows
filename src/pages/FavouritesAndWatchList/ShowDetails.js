import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import config from '../../config';
import './index.css';
import SimilarShows from './SimilarShows';

function PreviousOrNextEpisode ({title, name, date, overview, rating}) {
    return (
        <div className="episodes__ep">
            <div className="episodes__ep__header">{title}</div>
            <div className="episodes__ep__title">{name}</div>
            <div className="episodes__ep__date">{date}</div>
            <p className="episodes__ep__description">{overview || 'No description'}</p>
            {rating && <div className="episodes__ep__rating">Rating: {rating * 10}%</div>}
        </div>
    );
}

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
                {next && <PreviousOrNextEpisode title="Next Episode" {...next} />}
                {previous && <PreviousOrNextEpisode title="Previous Episode" {...previous} />}
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
                    <FontAwesomeIcon title={this.props.removeLabel}
                                     icon={this.props.removeIcon}
                                     onClick={() => this.props.removeFromList(movie)}/>
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
    removeFromList: PropTypes.func,
    removeIcon: PropTypes.element,
    removeLabel: PropTypes.string,
};

export default ShowDetails;
