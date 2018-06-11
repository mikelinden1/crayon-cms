import { ActionTypes } from 'utils/constants';
import config from 'config';

const defaultSort = config.defaultSort ? config.defaultSort : 'id';

const initialSort = {
    field: defaultSort
};

function sort(state = initialSort, action) {
    switch (action.type) {
        case ActionTypes.SET_SORT: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export default sort;