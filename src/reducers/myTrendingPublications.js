import * as actions from 'actions/actionTypes';

export const initialState = {
    trendingPublicationsList: [],
    loadingTrendingPublications: false,
    showTrendingPublicationsTab: true
};

const handlers = {
    [actions.TRENDING_PUBLICATIONS_LOADING]: (state) => {
        return {
            ...state,
            trendingPublicationsList: [],
            loadingTrendingPublications: true
        };
    },

    [`${actions.TRENDING_PUBLICATIONS_LOADED}@`]: (state, action) => {
        const source = actions.getActionSuffix(action.type);

        const trendingPublicationsList = [
            ...state.trendingPublicationsList,
            {
                key: source,
                values: action.payload.data
            }
        ];

        return {
            ...state,
            trendingPublicationsList,
            loadingTrendingPublications: false,
            showTrendingPublicationsTab: trendingPublicationsList.length > 0
        };
    },

    [actions.TRENDING_PUBLICATIONS_LOADED]: (state, action) => {
        return {
            ...state,
            trendingPublicationsList: action.payload.data,
            loadingTrendingPublications: false,
            showTrendingPublicationsTab: action.payload.data.length > 0
        };
    },

    [actions.TRENDING_PUBLICATIONS_FAILED]: (state) => {
        return {
            ...state,
            trendingPublicationsList: [],
            loadingTrendingPublications: false,
            showTrendingPublicationsTab: false
        };
    }
};

export default function myTrendingPublicationsReducer(state = initialState, action) {
    const handler = action.type.indexOf('@') >= 0 ? handlers[actions.getAction(action.type)] : handlers[action.type];
    if (!handler) {
        return state;
    }
    return handler(state, action);
}
