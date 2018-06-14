import { ActionTypes } from 'utils/constants';
import config from 'config';

function sortCreator(id) {
    const moduleConfig = config.modules[id];
    const initialSort = moduleConfig.defaultSort ? moduleConfig.defaultSort : { field: 'id' };

    return function sort(state = initialSort, action) {
        switch (action.type) {
            case `${ActionTypes.SET_SORT}_${id}`: {
                return action.payload;
            }
            default: {
                return state;
            }
        }
    }
}

export default sortCreator;