import { ActionTypes } from 'utils/constants';

const initialState = {
    fetching: false,
    fetched: true,
    items: []
};

function items(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ITEMS + '_PENDING': {
            return {
                ...state,
                fetching: true
            };
        }
        case ActionTypes.FETCH_ITEMS + '_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                items: action.payload.data,
                error: false
            };
        }
        case ActionTypes.FETCH_ITEMS + '_REJECTED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: true
            };
        }
        case ActionTypes.SAVE_NEW_ITEM + '_FULFILLED': {
            const items = [...state.items];

            const newItem = action.payload.data;

            items.push(newItem);

            return {
                ...state,
                items
            };
        }
        case ActionTypes.ITEM_SORT_END: {
            return {
                ...state,
                items: [...action.payload]
            };
        }
        case ActionTypes.SAVE_EDIT_ITEM: {
            return {
                ...state,
                itemSaving: action.payload
            };
        }
        case ActionTypes.SAVE_EDIT_ITEM + '_FULFILLED': {
            const items = [...state.items];

            const newItem = state.itemSaving;
            const index = items.map(function(o) { return o.id; }).indexOf(newItem.id);

            items[index] = newItem;

            return {
                ...state,
                items,
                itemSaving: null
            };
        }
        case ActionTypes.DELETE_ITEM: {
            return {
                ...state,
                itemDeletingId: action.payload
            };
        }
        case ActionTypes.DELETE_ITEM + '_PENDING': {
            const items = [...state.items];

            const deleteItemId = state.itemDeletingId;
            const index = items.map(function(o) { return o.id; }).indexOf(deleteItemId);

            items[index] = {
                ...items[index],
                deleting: true
            };

            return {
                ...state,
                items
            };
        }
        case ActionTypes.DELETE_ITEM + '_FULFILLED': {
            const items = [...state.items];

            const deleteItemId = state.itemDeletingId;
            const index = items.map(function(o) { return o.id; }).indexOf(deleteItemId);

            items.splice(index, 1);

            return {
                ...state,
                items,
                itemDeletingId: null
            };
        }
        default: {
            return state;
        }
    }
}

export default items;