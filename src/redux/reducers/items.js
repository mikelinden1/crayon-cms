import { ActionTypes } from 'utils/constants';

const initialState = {
    fetching: false,
    fetched: false,
    items: null
};

function itemsCreator(id) {
    return function items(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.FETCH_ITEMS}_${id}_PENDING`: {
                return {
                    ...state,
                    fetching: true
                };
            }
            case `${ActionTypes.FETCH_ITEMS}_${id}_FULFILLED`: {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    items: action.payload.data[id],
                    error: false
                };
            }
            case `${ActionTypes.FETCH_ITEMS}_${id}_REJECTED`: {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    error: true
                };
            }
            case `${ActionTypes.SAVE_BULK_ITEMS}_${id}_FULFILLED`: {
                const oldItems = [...state.items];
                const newItems = action.payload;
                const items = oldItems.concat(newItems);

                return {
                    ...state,
                    items
                };
            }
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}`:
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}`: {
                return {
                    ...state,
                    itemSaving: action.payload
                };
            }
            case `${ActionTypes.SAVE_BULK_EDIT}_${id}`: {
                return {
                    ...state,
                    bulkItemsProcessing: action.payload.selectedItems,
                    bulkDataSaving: action.payload.data
                }
            }
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_FULFILLED`: {
                const newId = action.payload.data;

                if (newId) {
                    const items = [...state.items];

                    const newItem = state.itemSaving;
                    newItem.id = action.payload.data;

                    items.push(newItem);

                    return {
                        ...state,
                        items
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_FULFILLED`: {
                const items = [...state.items];

                const newItem = state.itemSaving;
                const index = items.map((o) => o.id).indexOf(newItem.id);

                items[index] = newItem;

                return {
                    ...state,
                    items,
                    itemSaving: null
                };
            }
            case `${ActionTypes.SAVE_BULK_EDIT}_${id}_FULFILLED`: {
                const items = [...state.items];

                const itemIds = state.bulkItemsProcessing;
                const newItemData = state.bulkDataSaving;

                itemIds.forEach((itemId) => {
                    const index = items.map((o) => o.id).indexOf(itemId);
                    const oldItem = items[index];

                    const newItem = {
                        ...oldItem,
                        ...newItemData
                    };

                    items[index] = newItem;
                });

                return {
                    ...state,
                    items,
                    bulkItemsProcessing: null,
                    bulkDataSaving: null
                };
            }
            case `${ActionTypes.ITEM_SORT_END}_${id}`: {
                return {
                    ...state,
                    items: [...action.payload]
                };
            }
            case `${ActionTypes.DELETE_ITEM}_${id}`: {
                return {
                    ...state,
                    itemDeletingId: action.payload
                };
            }
            case `${ActionTypes.DELETE_ITEM}_${id}_PENDING`: {
                const items = [...state.items];

                const deleteItemId = state.itemDeletingId;
                const index = items.map((o) => o.id).indexOf(deleteItemId);

                items[index] = {
                    ...items[index],
                    deleting: true
                };

                return {
                    ...state,
                    items
                };
            }
            case `${ActionTypes.DELETE_ITEM}_${id}_FULFILLED`: {
                const items = [...state.items];

                const deleteItemId = state.itemDeletingId;
                const index = items.map((o) => o.id).indexOf(deleteItemId);

                items.splice(index, 1);

                return {
                    ...state,
                    items,
                    itemDeletingId: null
                };
            }
            case `${ActionTypes.BULK_DELETE}_${id}`: {
                return {
                    ...state,
                    bulkItemsProcessing: action.payload
                }
            }
            case `${ActionTypes.BULK_DELETE}_${id}_PENDING`: {
                const items = [...state.items];
                const itemIds = state.bulkItemsProcessing;

                itemIds.forEach((itemId) => {
                    const index = items.map((o) => o.id).indexOf(itemId);
                    const oldItem = items[index];

                    const newItem = {
                        ...oldItem,
                        deleting: true
                    };

                    items[index] = newItem;
                });

                return {
                    ...state,
                    items
                };
            }
            case `${ActionTypes.BULK_DELETE}_${id}_FULFILLED`: {
                const items = [...state.items];

                const itemIds = state.bulkItemsProcessing;

                itemIds.forEach((itemId) => {
                    const index = items.map((o) => o.id).indexOf(itemId);
                    items.splice(index, 1);
                });

                return {
                    ...state,
                    items,
                    bulkItemsProcessing: null
                };
            }
            default: {
                return state;
            }
        }
    }
}

export default itemsCreator;