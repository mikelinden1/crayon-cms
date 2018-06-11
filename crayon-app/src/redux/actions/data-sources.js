import { ActionTypes } from 'utils/constants';
import axios from 'axios';

import getPropByName from 'utils/get-prop-by-name';

export function fetchDatasource(name, source) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.FETCH_DATA_SOURCE,
            payload: { name }
        });

        axios.get(source.url).then((res) => {
            const rawData = res.data;

            const sourceProp = getPropByName(name);

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
                type: ActionTypes.FETCH_DATA_SOURCE_COMPLETE,
                payload: { name, data }
            });
        });
    };
}