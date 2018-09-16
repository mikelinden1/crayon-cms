import { ActionTypes } from 'utils/constants';

const initialState = {
    fetched: false,
    fetching: false,
    sort: 'desc'
};

export default function mediaPicker(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_MEDIA_PICKER: {
            return {
                ...state,
                open: true,
                target: action.payload
            }
        }
        case ActionTypes.CLOSE_MEDIA_PICKER:
        case ActionTypes.MEDIA_PICKER_SELECTED_ITEM: {
            return {
                ...state,
                open: false,
                target: null,
                selectedItem: null,
                editingTitle: false,
                newName: null
            };
        }
        case ActionTypes.MEDIA_PICKER_CLICK_ITEM: {
            return {
                ...state,
                selectedItem: action.payload,
                newName: action.payload.name,
                editingTitle: false
            }
        }
        case ActionTypes.SET_MEDIA_MODULE_FILTER:
        case ActionTypes.SET_MODULE_ID: {
            return {
                ...state,
                moduleFilter: action.payload
            };
        }
        case ActionTypes.SET_MEDIA_SEARCH: {
            return {
                ...state,
                search: action.payload
            };
        }
        case ActionTypes.SET_MEDIA_SORT: {
            return {
                ...state,
                sort: action.payload
            };
        }
        case ActionTypes.FETCH_MEDIA + '_PENDING': {
            return {
                ...state,
                fetching: true
            };
        }
        case ActionTypes.FETCH_MEDIA + '_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: true,
                fetched: true
            };
        }
        case ActionTypes.FETCH_MEDIA + '_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                items: action.payload.data.media
            };
        }
        case ActionTypes.UPLOAD_FILE + '_PENDING': {
            return {
                ...state,
                uploading: true,
                progress: 0
            };
        }
        case ActionTypes.UPLOAD_FILE + '_FULFILLED': {
            const items = [...state.items];
            const newItem = action.payload.data.newItem;
            items.unshift(newItem);

            return {
                ...state,
                uploading: false,
                items,
                selectedItem: newItem,
                setNewName: newItem.name
            };
        }
        case ActionTypes.DELETE_MEDIA: {
            return {
                ...state,
                deletingId: action.payload
            };
        }
        case ActionTypes.DELETE_MEDIA + '_FULFILLED': {
            const deleteId = state.deletingId;
            const selectedId = state.selectedItem ? state.selectedItem.id : null;
            const clearSelected = deleteId === selectedId;

            const selectedItem = clearSelected ? null : state.selectedItem;

            const items = [...state.items].filter(item => item.id !== deleteId);

            return {
                ...state,
                deletingId: null,
                selectedItem,
                items
            };
        }
        case ActionTypes.MEDIA_TOGGLE_NAME_EDIT: {
            return {
                ...state,
                editingTitle: !state.editingTitle
            };
        }
        case ActionTypes.MEDIA_SET_NAME: {
            return {
                ...state,
                newName: action.payload
            };
        }
        case ActionTypes.MEDIA_SAVE_NAME: {
            return {
                ...state,
                savingNameData: action.payload
            };
        }
        case ActionTypes.MEDIA_SAVE_NAME + '_PENDING': {
            return {
                ...state,
                savingName: true
            };
        }
        case ActionTypes.MEDIA_SAVE_NAME + '_FULFILLED': {
            const newName = state.savingNameData.name;
            const nameId = state.savingNameData.id;

            const items = [...state.items];
            const item = items.find(item => item.id === nameId);
            item.name = newName;

            return {
                ...state,
                items,
                editingTitle: false,
                savingName: false,
                savingNameData: null
            };
        }
        case ActionTypes.UPLOAD_PROGRESS: {
            return {
                ...state,
                progress: action.payload
            };
        }
        default: {
            return state;
        }
    }
}