import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteMultiItem, multiItemSortEnd } from 'redux/actions/modal-item-props';

import { getPropValue } from 'redux/selectors/get-prop-value';

import FieldMultiValues from './field-multi-values';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        allValue: getPropValue(state, ownProps),
        currentModule: state.currentModule
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            deleteMultiItem,
            multiItemSortEnd
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldMultiValues);
