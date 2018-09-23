import axios from 'axios';
import config from '../config';

const baseQueryParams = {
    'api_key': config.apiToken,
};

export async function searchMovies (searchTerm) {
    const options = {params: {...baseQueryParams, query: searchTerm}};
    const response = await axios.get(`${config.apiBaseUrl}/search/keyword`, options);
    return response.data.results;
}

export async function listMovies () {
    const response = await axios.get(`${config.apiBaseUrl}/discover/movie`, {params: baseQueryParams});
    return response.data.results;
}
