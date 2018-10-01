import PropTypes from 'prop-types';
import React, {Component} from 'react';
import PosterImage from '../../shared-components/PosterImage';
import Cursor from '../../utils/cursor';
import './SimilarShows.css';

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
        this.cursor = new Cursor(`/tv/${this.props.show.id}/similar`);
        this.state = {similar: [], isLoading: false};
    }

    componentDidMount () {
        this.loadMoreSimilarShows();
    }

    loadMoreSimilarShows () {
        this.cursor.nextPage().then(shows => {
            this.setState({similar: [...this.state.similar, ...shows]});
        });
    }

    render () {
        return (
            <div className="similar-shows">
                <div className="similar-shows__header">Similar Shows:</div>
                <ul className="similar-shows__list">
                    {this.state.similar.map(show => <SimilarShow key={show.id} show={show}/>)}
                    <li className="similar-shows__list__load-more" onClick={() => this.loadMoreSimilarShows()}>Load
                        More
                    </li>
                </ul>
            </div>
        );
    }
}

SimilarShows.propTypes = {
    show: PropTypes.object,
};

export default SimilarShows;
