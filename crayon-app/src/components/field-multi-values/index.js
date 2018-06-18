import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { validateOnChange } from 'redux/actions/items';
import { setItemProp, setMultiItemProp } from 'redux/actions/modal-item-props';
import { fetchDatasource } from 'redux/actions/data-sources';

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
            setItemProp,
            setMultiItemProp,
            fetchDatasource,
            validateOnChange
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldMultiValues);
