import { ActionTypes } from 'utils/constants';

export function addNotification(text, success) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.ADD_NOTIFICATION,
            payload: {
                id: Math.floor(Math.random()*1000),
                text,
                success
            }
        });
    };
};

export function hideNotification(id) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.HIDE_NOTIFICATION,
            payload: id
        });
    };
};

export function setNotificationTimer(timer, id) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.SET_NOTIFICATION_TIMER,
            payload: {
                timer,
                id
            }
        });
    };
};

export function removeNotification(id) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.REMOVE_NOTIFICATION,
            payload: id
        });
    };
};