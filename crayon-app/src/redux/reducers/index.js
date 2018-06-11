import { combineReducers } from 'redux';

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

export default combineReducers({
                                currentModule,
                                items,
                                itemModal,
                                modalItemProps,
                                datasources,
                                currentView,
                                filters,
                                search,
                                sort,
                                archive,
                                paginator,
                                bulkAdd
                            });
