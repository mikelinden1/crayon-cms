import { ActionTypes } from 'utils/constants';
import { setCookie } from 'utils/set-cookie';
import { setAxiosAuth } from 'utils/set-axios-auth';

const initialState = {
    loggedIn: false,
    user: null
};

function user(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN + '_PENDING': {
            return {
                ...state,
                loggingIn: true,
                error: null
            };
        }
        case ActionTypes.LOGIN + '_REJECTED': {
            return {
                ...state,
                loggingIn: false,
                error: 'An unexpected error occured.'
            };
        }
        case ActionTypes.LOGIN + '_FULFILLED': {
            const payload = action.payload.data;

            if (payload.success) {
                const jwt = payload.token;

                setAxiosAuth(jwt);

                setCookie('usr', jwt, 30);

                return {
                    ...state,
                    loggingIn: false,
                    loggedIn: true,
                    user: {
                        name: payload.name,
                        username: payload.username
                    },
                    jwt
                };
            } else {
                return {
                    ...state,
                    loggingIn: false,
                    error: action.payload.data.msg
                };
            }
        }
        case ActionTypes.LOGOUT: {
            return {
                ...state,
                loggedIn: false,
                jwt: null,
                user: null
            };
        }
        case ActionTypes.VALIDATE_JWT + '_PENDING': {
            return {
                ...state,
                validatingJwt: true
            };
        }
        case ActionTypes.VALIDATE_JWT + '_REJECTED': {
            setCookie('usr', '', -10);

            return {
                ...state,
                validatingJwt: false
            };
        }
        case ActionTypes.VALIDATE_JWT + '_FULFILLED': {
            const payload = action.payload.data;

            if (payload.success) {
                const jwt = payload.token;

                setAxiosAuth(jwt);

                return {
                    ...state,
                    validatingJwt: false,
                    loggedIn: true,
                    user: {
                        name: payload.user_data.name,
                        username: payload.user_data.username
                    },
                    jwt
                };
            } else {
                setCookie('usr', '', -10);

                return {
                    ...state,
                    validatingJwt: false
                };
            }
        }
        default: {
            return state;
        }
    }
}

export default user;