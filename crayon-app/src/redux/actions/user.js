import { ActionTypes } from 'utils/constants';
import axios from 'axios';
import passwordHash from 'password-hash';
import { setCookie } from 'utils/set-cookie';
import config from 'config';

export function login(data) {
    return (dispatch) => {
        const action = {};

        action.type = ActionTypes.LOGIN;
        action.payload = axios.post(`${config.apiBase}/login`, data);

        dispatch(action);
    };
};

export function logout() {
    setCookie('usr', '', -10);

    return { type: ActionTypes.LOGOUT };
};