import { ActionTypes } from 'utils/constants';
import axios from 'axios';

import { getEnvVar } from 'utils/get-env-var';
import getPropByName from 'utils/get-prop-by-name';

export function fetchDatasource(name, source) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.FETCH_DATA_SOURCE}_${state.currentModule}`,
            payload: { name }
        });

        let sourceUrl = source.url;

        const API_BASE = getEnvVar('apiBase');
        sourceUrl = sourceUrl.replace('[API_BASE]', API_BASE);

        axios.get(sourceUrl).then((res) => {
            const sourceProp = getPropByName(state.currentModule, name);

            if (!sourceProp) {
                console.error('Missing prop in datasource dispatch', name);
                return;
            }

            const { labelKey, valueKey, nested } = sourceProp.source;

            const rawData = nested ? res.data[nested] : res.data;

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