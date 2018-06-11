import { ActionTypes } from 'utils/constants';

export function setFilter(name, val) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_FILTER}_${state.currentModule}`,
            payload: { name, val }
        });
    };
}

export function setSearch(val) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_SEARCH}_${state.currentModule}`,
            payload: val
        });
    };
}

export function setSort(val) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_SORT}_${state.currentModule}`,
            payload: val
        });
    };
}

export function setArchive(archive) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_ARCHIVE}_${state.currentModule}`,
            payload: archive
        });
    };
}

export function clearFilters() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.CLEAR_FILTERS}_${state.currentModule}`
        });
    };
}