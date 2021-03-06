import { ActionTypes } from 'utils/constants';

function dataSourcesCreator(id) {
    return function dataSources(state = {}, action) {
        switch (action.type) {
            case `${ActionTypes.FETCH_DATA_SOURCE}_${id}`: {
                const name = action.payload.name;

                const nextState = {...state};

                nextState[name] = {
                    fetching: true
                };

                return nextState;
            }
            case `${ActionTypes.FETCH_DATA_SOURCE_COMPLETE}_${id}`: {
                const { name, data } = action.payload;

                const nextState = {...state};

                nextState[name] = {
                    ...nextState[name],
                    fetching: false,
                    fetched: true,
                    data
                };

                return nextState;
            }
            default: {
                return state;
            }
        }
    }
}

export default dataSourcesCreator;