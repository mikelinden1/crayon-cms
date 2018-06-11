import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addColumn, setColumns, setCsvContent, closeBulkAddDialog, openBulkAddDialog, throwBulkError, saveBulkItems } from 'redux/actions/bulk-add';

import BulkAdd from './bulk-add';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        open: state.bulkAdd.open,
        adding: state.bulkAdd.adding,
        columns: state.bulkAdd.columns,
        csvContents: state.bulkAdd.csvContents,
        error: state.bulkAdd.error
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
