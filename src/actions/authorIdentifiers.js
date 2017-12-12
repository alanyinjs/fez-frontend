import * as actions from './actionTypes';
import {get, patch} from 'repositories/generic';
import * as routes from 'repositories/routes';
import {transformAuthorIdentifier} from './authorIdentifierTransformer';
import {AUTHOR_IDENTIFIER_ORCID} from 'config/general';
import {locale} from 'locale';
import {dismissAppAlert} from './app';

/**
 * Returns orcid access token for an author
 * @param {string} userId
 * @param {object} params
 * @returns {action}
 */
export function requestAuthorOrcidInfo(userId, authorId, params) {
    return dispatch => {
        let orcidId = null;

        dispatch({type: actions.ORCID_ACCESS_TOKEN_REQUEST});
        dispatch({
            type: actions.APP_ALERT_SHOW,
            payload: {
                ...locale.authorIdentifiers.orcid.linkProgressAlert
            }
        });
        return get(routes.AUTHOR_ORCID_DETAILS_API({userId: userId, params: params}), false)
            .then((response) => {
                dispatch({type: actions.ORCID_ACCESS_TOKEN_LOADED});

                orcidId = response.orcid;

                const data = transformAuthorIdentifier(AUTHOR_IDENTIFIER_ORCID, authorId, orcidId, response);

                dispatch({type: actions.CURRENT_AUTHOR_SAVING});
                return patch(routes.AUTHOR_API({authorId}), data);
            })
            .then((response) => {
                dispatch({type: actions.CURRENT_AUTHOR_SAVED, payload: response.data});
                dispatch({
                    type: actions.APP_ALERT_SHOW,
                    payload: {
                        ...locale.authorIdentifiers.orcid.successAlert,
                        dismissAction: () => dispatch(dismissAppAlert())
                    }
                });
            })
            .catch(error => {
                console.log(error);
                if (error.status === 403) dispatch({type: actions.CURRENT_ACCOUNT_ANONYMOUS});
                if (error.status === 500) {
                    dispatch({
                        type: actions.APP_ALERT_SHOW,
                        payload: {
                            ...locale.authorIdentifiers.orcid.authoriseOrcidAlert,
                            dismissAction: () => dispatch(dismissAppAlert())
                        }
                    });
                }
                if (!orcidId) {
                    dispatch({
                        type: actions.ORCID_ACCESS_TOKEN_REQUEST_FAILED,
                        payload: error
                    });
                } else {
                    dispatch({
                        type: actions.CURRENT_AUTHOR_SAVE_FAILED,
                        payload: error
                    });
                }
            });
    };
}

