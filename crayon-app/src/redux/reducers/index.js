import { combineReducers } from 'redux';
import config from 'config';

import currentModule from './current-module';
import items from './items';
import itemModal from './item-modal';
import modalItemProps from './modal-item-props';
import datasources from './data-sources';
import currentView from './current-view';
import filters from './filters';
import search from './search';
import sort from './sort';
import archive from './archive';
import paginator from './paginator';
import bulkAdd from './bulk-add';

const reducers = config.moduleOrder.reduce((r, moduleId) => {
    r[moduleId] = createModuleReducers(moduleId);
    return r;
}, { currentModule });


export default combineReducers(reducers);


function createModuleReducers(id) {
    return combineReducers({
        items: items(id),
        itemModal: itemModal(id),
        modalItemProps: modalItemProps(id),
        datasources: datasources(id),
        currentView: currentView(id),
        filters: filters(id),
        search: search(id),
        sort: sort(id),
        archive: archive(id),
        paginator: paginator(id),
        bulkAdd: bulkAdd(id)
    });
}