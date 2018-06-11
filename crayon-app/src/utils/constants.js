export const ActionTypes = {
    OPEN_ITEM_DIALOG: 'OPEN_ITEM_DIALOG',
    CLOSE_ITEM_DIALOG: 'CLOSE_ITEM_DIALOG',
    SET_PROP_VALUE: 'SET_PROP_VALUE',
    FETCH_DATA_SOURCE: 'FETCH_DATA_SOURCE',
    FETCH_DATA_SOURCE_COMPLETE: 'FETCH_DATA_SOURCE_COMPLETE',
    FETCH_ITEMS: 'FETCH_ITEMS',
    EDIT_ITEM: 'EDIT_ITEM',
    SAVE_NEW_ITEM: 'SAVE_NEW_ITEM',
    SAVE_EDIT_ITEM: 'SAVE_EDIT_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    VALIDATION_CHECK: 'VALIDATION_CHECK',
    SWITCH_VIEW: 'SWITCH_VIEW',
    SET_FILTER: 'SET_FILTER',
    SET_SEARCH: 'SET_SEARCH',
    SET_SORT: 'SET_SORT',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_ARCHIVE: 'SET_ARCHIVE',
    CLEAR_FILTERS: 'CLEAR_FILTERS',
    ITEM_SORT_END: 'ITEM_SORT_END',
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_LOADER: 'HIDE_LOADER',
    OPEN_BULK_ADD_DIALOG: 'OPEN_BULK_ADD_DIALOG',
    CLOSE_BULK_ADD_DIALOG: 'CLOSE_BULK_ADD_DIALOG',
    ADD_BULK_COLUMN: 'ADD_BULK_COLUMN',
    SET_BULK_COLUMNS: 'SET_BULK_COLUMNS',
    SET_BULK_CSV_CONTENTS: 'SET_BULK_CSV_CONTENTS',
    BULK_ADD_ERROR: 'BULK_ADD_ERROR',
    SAVE_BULK_ITEMS: 'SAVE_BULK_ITEMS'
};

function getApiPath() {
    // window.ajaxurl in Wordpress env
    if (window.ajaxurl) {
        return window.ajaxurl;
    }

    return 'http://localhost/skift/wp-admin/admin-ajax.php';
}

export const API_ENDPOINT = getApiPath();

export const GET_ACTION = 'get'; // GET
export const SAVE_NEW_ACTION = 'post'; // POST
export const SAVE_EDIT_ACTION = 'put'; // PUT
export const SAVE_DELETE_ACTION = 'delete'; // PUT
export const SAVE_SORT_ACTION = 'sort'; // PUT


export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occured. Please try again.';
