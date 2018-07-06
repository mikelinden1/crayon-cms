import { createSelector } from 'reselect';

import getModuleConfig from 'utils/get-module-config';

const currentModule = (state) => state.currentModule;

export const getCurrentModuleConfig = createSelector(
    [ currentModule ],
    (currentModule) => {
        return getModuleConfig(currentModule);
    }
);
