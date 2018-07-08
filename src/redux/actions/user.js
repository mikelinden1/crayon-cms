import { ActionTypes } from 'utils/constants';
import axios from 'axios';
import { setCookie } from 'utils/set-cookie';
import { getEnvVar } from 'utils/get-env-var';

export function login(data) {
    return (dispatch) => {
        const action = {};

        action.type = ActionTypes.LOGIN;
        action.payload = axios.post(`${getEnvVar('apiBase')}/login`, data);

        dispatch(action);
    };
};

export function logout() {
    setCookie('usr', '', -10);

    return { type: ActionTypes.LOGOUT };
};

export function validateJwt(jwt) {
    return (dispatch) => {
        const action = {};

        const data = { jwt };

        action.type = ActionTypes.VALIDATE_JWT;
        action.payload = axios.post(`${getEnvVar('apiBase')}/validate-jwt`, data);

        dispatch(action);
    };
}