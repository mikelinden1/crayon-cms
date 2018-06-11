import { ActionTypes } from 'utils/constants';

export function setFilter(name, val) {
    return {
        type: ActionTypes.SET_FILTER,
        payload: { name, val }
    };
}

export function setSearch(val) {
    return {
        type: ActionTypes.SET_SEARCH,
        payload: val
    };
}

export function setSort(val) {
    return {
        type: ActionTypes.SET_SORT,
        payload: val
    };
}

export function setArchive(archive) {
    return {
        type: ActionTypes.SET_ARCHIVE,
        payload: archive
    };
}

export function clearFilters() {
    return {
        type: ActionTypes.CLEAR_FILTERS
    };
}