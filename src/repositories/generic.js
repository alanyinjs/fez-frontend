import {api} from '../config';

/**
 * Send a put request
 * @param {string} apiUrl
 * @param {object} data to be posted to API
 * @param {object} any query string parameters (defined in routes with apiUrl)
 * @param {object} any additional options (headers, responseType, etc)
 * @returns {Promise}
 */
export function put({apiUrl, options = {}}, data, config = {}) {
    console.log('PUT: ' + apiUrl);
    return api.put(apiUrl, data, {...config, ...options});
}

/**
 * Send a post request
 * @param {string} apiUrl
 * @param {object} data to be posted to API
 * @param {object} any query string parameters (defined in routes with apiUrl)
 * @param {object} any additional options (headers, responseType, etc)
 * @returns {Promise}
 */
export function post({apiUrl, options = {}}, data, config = {}) {
    console.log('POST: ' + apiUrl);
    return api.post(apiUrl, data, {...config, ...options});
}

/**
 * Send a patch request
 * @param {string} apiUrl
 * @param {object} data to be posted to API
 * @param {object} any query string parameters (defined in routes with apiUrl)
 * @param {object} any additional options (headers, responseType, etc)
 * @returns {Promise}
 */
export function patch({apiUrl, options = {}}, data, config = {}) {
    console.log('PATCH: ' + apiUrl);
    return api.patch(apiUrl, data, {...config, ...options});
}

/**
 * Send a get request
 * @param {string} apiUrl
 * @param {object} any query string parameters (defined in routes with apiUrl)
 * @param {object} any additional options (headers, responseType, etc)
 * @returns {Promise}
 */
export function get({apiUrl, options = {}}, config = {}) {
    // console.log('GET: ' + apiUrl);
    // console.log({...config, ...options});
    return api.get(apiUrl, {...config, ...options});
}
