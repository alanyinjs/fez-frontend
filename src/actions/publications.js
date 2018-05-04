import * as actions from './actionTypes';
import {get} from 'repositories/generic';
import * as routes from 'repositories/routes';
import {transformTrendingPublicationsMetricsData} from './academicDataTransformers';

/**
 * Get latest publications
 * @param {string} author user name
 * @returns {action}
 */
export function searchLatestPublications() {
    return dispatch => {
        dispatch({type: actions.LATEST_PUBLICATIONS_LOADING});
        return get(routes.CURRENT_USER_RECORDS_API({pageSize: 5}))
            .then(response => {
                dispatch({
                    type: actions.LATEST_PUBLICATIONS_LOADED,
                    payload: response
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.LATEST_PUBLICATIONS_FAILED,
                    payload: error.message
                });
            });
    };
}

/**
 * Get author's publications
 * @param {string} author user name
 * @returns {action}
 */
export function searchAuthorPublications({page = 1, pageSize = 20, sortBy = 'published_date', sortDirection = 'Desc', activeFacets = {filters: {}, ranges: {}}}) {
    return dispatch => {
        dispatch({type: actions.AUTHOR_PUBLICATIONS_LOADING});

        return get(routes.CURRENT_USER_RECORDS_API({
            page: page,
            pageSize: pageSize,
            sortBy: sortBy,
            sortDirection: sortDirection,
            facets: activeFacets
        }))
            .then(response => {
                dispatch({
                    type: actions.AUTHOR_PUBLICATIONS_LOADED,
                    payload: response
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.AUTHOR_PUBLICATIONS_FAILED,
                    payload: error.message
                });
            });
    };
}

/**
 * Get trending publications
 * @param {string} author user name
 * @returns {action}
 */
export function searchTrendingPublications() {
    return dispatch => {
        dispatch({type: actions.TRENDING_PUBLICATIONS_LOADING});
        return get(routes.ACADEMIC_STATS_PUBLICATIONS_TRENDING_API())
            .then(response => {
                if (response.data.length > 0) {
                    const transformedTrendingPublications = transformTrendingPublicationsMetricsData(response);

                    transformedTrendingPublications.map(metricsData => {
                        dispatch({
                            type: `${actions.TRENDING_PUBLICATIONS_LOADED}@${metricsData.key}`,
                            payload: {data: metricsData.values},
                        });
                    });
                } else {
                    dispatch({
                        type: actions.TRENDING_PUBLICATIONS_LOADED,
                        payload: response
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: actions.TRENDING_PUBLICATIONS_FAILED,
                    payload: error.message
                });
            });
    };
}
