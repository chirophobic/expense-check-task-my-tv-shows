import axios from 'axios';
import config from '../config';

export default class Cursor {
    currentPage = 0;
    baseQueryParams = {
        'api_key': config.apiToken,
    };
    additionalQueryParams = {};

    constructor (url, params) {
        this.url = url;
        this.additionalQueryParams = {...params};
    }

    async nextPage () {
        const params = {params: {...this.baseQueryParams, ...this.additionalQueryParams, page: ++this.currentPage}};
        const response = await axios.get(`${config.apiBaseUrl}${this.url}`, params);
        return response.data.results;
    }
}
