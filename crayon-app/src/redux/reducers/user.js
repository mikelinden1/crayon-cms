import { ActionTypes } from 'utils/constants';

const initialState = {
    loggedIn: true,
    user: {
        name: 'Mike Linden'
    },
    jwt: 'asdaskhdfgsakjdfhajksdhflkajshdfjlkahsdljfhj124q243612'
};

function user(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN + '_PENDING': {
            return {
                ...state,
                loggingIn: true
            };
        }
        case ActionTypes.LOGIN + '_REJECTED': {
            return {
                ...state,
                loggingIn: false,
                error: action.payload.data
            };
        }
        case ActionTypes.LOGIN + '_FULFILLED': {
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                jwt: action.payload.data
            };
        }
        default: {
            return state;
        }
    }
}

export default user;