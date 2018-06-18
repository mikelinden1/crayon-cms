import React from 'react';
import PropTypes from 'prop-types';

import FieldMultiValueWrapper from './field-multi-values-wrapper';

export default class FieldMultiValue extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        allValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        actions: PropTypes.shape({
            multiItemSortEnd: PropTypes.func.isRequired
        }).isRequired
    };

    onSortEnd(e) {
        const { name, allValue, actions: { multiItemSortEnd } } = this.props;

        multiItemSortEnd(name, allValue, e.oldIndex, e.newIndex);
    }

    render() {
        const { allValue } = this.props;

        if (!allValue || !allValue.length) {
            return null;
        }

        return <FieldMultiValueWrapper {...this.props} helperClass="field-multi-values-row" onSortEnd={(e) => this.onSortEnd(e)} />;
    }
}