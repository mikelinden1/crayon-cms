import { ActionTypes } from 'utils/constants';
import axios from 'axios';

import getPropByName from 'utils/get-prop-by-name';

export function fetchDatasource(name, source) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.FETCH_DATA_SOURCE}_${state.currentModule}`,
            payload: { name }
        });

        axios.get(source.url).then((res) => {
            const rawData = res.data;


            const sourceProp = getPropByName(state.currentModule, name);

            if (!sourceProp) {
                console.error('Missing prop in datasource dispatch', name);
                return;
            }

            const { labelKey, valueKey } = sourceProp.source;

            const data = rawData.reduce((out, item) => {
                out.push({
                    label: item[labelKey],
                    value: item[valueKey]
                });
                return out;
            }, []);

            dispatch({
                type: `${ActionTypes.FETCH_DATA_SOURCE_COMPLETE}_${state.currentModule}`,
                payload: { name, data }
            });
        });
    };
}