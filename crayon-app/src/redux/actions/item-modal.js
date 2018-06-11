import { ActionTypes } from 'utils/constants';

export function openItemModal() {
    return {
        type: ActionTypes.OPEN_ITEM_DIALOG
    };
}

export function closeItemModal() {
    return {
        type: ActionTypes.CLOSE_ITEM_DIALOG
    };
}