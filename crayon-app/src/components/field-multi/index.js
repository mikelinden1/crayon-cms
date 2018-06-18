import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getModuleReduxProp from 'utils/get-module-redux-prop';

import { validateOnChange } from 'redux/actions/items';
import { setItemProp, setMultiItemProp } from 'redux/actions/modal-item-props';
import { fetchDatasource } from 'redux/actions/data-sources';

import { getPropValue } from 'redux/selectors/get-prop-value';
import { getMuliPropValue } from 'redux/selectors/get-multi-prop-value';

import FieldMulti from './field-multi';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        value: getMuliPropValue(state, ownProps),
        datasources: getModuleReduxProp(state, 'datasources'),
        allValue: getPropValue(state, ownProps)
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

export default connect(mapStateToProps, mapDispatchToProps)(FieldMulti);
