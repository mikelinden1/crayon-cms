import { ActionTypes } from 'utils/constants';

export function startActivityTracking() {
    return (dispatch) => {
        const activityTimer = setTimeout(() => setInactive(dispatch), 3*60*1000);

        dispatch({
            type: ActionTypes.START_TRACKING_ACTIVITY,
            payload: activityTimer
        });
    };
};

export function activityDetected() {
    return (dispatch, getState) => {
        const state = getState();
        const { active, timerId } = state.activity;

        if (!active) {
            dispatch({
                type: ActionTypes.SET_ACTIVE
            });

            clearTimeout(timerId);

            startActivityTracking()(dispatch);
        }
    };
};

function setInactive(dispatch) {
    dispatch({
        type: ActionTypes.SET_INACTIVE
    });
}