import Immutable from 'immutable';

import {PUBLICATION_SUB_TYPES_LOADED} from './actions';
import {RECORD_CREATED, RECORD_CREATE_FAILED, RECORD_PROCESSING, RECORD_RESET, RECORD_UPDATED} from 'actions';
import {FILES_UPLOADED} from '../../SharedComponents/FileUploader/actions';

// import {actionTypes} from 'redux-form';

const RecordState = {
    clear: {
        submitting: false,
        failed: false,
        submitted: false
    },
    submitting: {
        submitting: true,
        failed: false,
        submitted: false
    },
    failed: {
        submitting: false,
        failed: true,
        submitted: false
    },
    submitted: {
        submitting: false,
        failed: false,
        submitted: true
    }
};

export const initialState = Immutable.fromJS({
    publicationSubTypeList: {},
    recordSubmissionState: RecordState.clear,
    recordSubmissionErrorMessage: undefined,
    fileUploadCompleted: false

});


const handlers = {

    [PUBLICATION_SUB_TYPES_LOADED]: (state, action) => (state.set('publicationSubTypeList', Immutable.fromJS(action.payload))),

    [RECORD_CREATE_FAILED]: (state, action) => (state.set('recordSubmissionState', Immutable.fromJS(RecordState.failed)).set('recordSubmissionErrorMessage', Immutable.fromJS(action.payload))),

    [RECORD_PROCESSING]: (state) => (state.set('recordSubmissionState', Immutable.fromJS(RecordState.submitting)).set('recordSubmissionErrorMessage', undefined)),

    [RECORD_RESET]: (state) => (state.set('recordSubmissionState', Immutable.fromJS(RecordState.clear)).set('recordSubmissionErrorMessage', undefined)),

    [RECORD_CREATED]: (state) => (state.set('recordSubmissionState', Immutable.fromJS(RecordState.submitting)).set('recordSubmissionErrorMessage', undefined)),

    [FILES_UPLOADED]: (state) => (state.set('fileUploadCompleted', true)),

    [RECORD_UPDATED]: (state) => (state.set('recordSubmissionState', Immutable.fromJS(RecordState.submitted)).set('recordSubmissionErrorMessage', undefined))
};

export default function journalArticleReducer(state = initialState, action) {
    console.log(action);
    const handler = handlers[action.type];
    if (!handler) {
        return state;
    }
    return handler(state, action);
}
