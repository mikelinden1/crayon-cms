import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addColumn, setColumns, setCsvContent, closeBulkAddDialog, openBulkAddDialog, throwBulkError, saveBulkItems } from 'redux/actions/bulk-add';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import BulkAdd from './bulk-add';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        open: getModuleReduxProp(state, 'bulkAdd', 'open'),
        adding: getModuleReduxProp(state, 'bulkAdd', 'adding'),
        columns: getModuleReduxProp(state, 'bulkAdd', 'columns'),
        csvContents: getModuleReduxProp(state, 'bulkAdd', 'csvContents'),
        error: getModuleReduxProp(state, 'bulkAdd', 'error'),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addColumn,
            setColumns,
            setCsvContent,
            closeDialog: closeBulkAddDialog,
            openDialog: openBulkAddDialog,
            throwBulkError,
            save: saveBulkItems
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkAdd);
