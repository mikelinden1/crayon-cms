import React from 'react';

import FieldMultiValueWrapper from './field-multi-values-wrapper';

export default class FieldMultiValue extends React.PureComponent {
    onSortEnd(e) {
        const { name, allValue, actions: { multiItemSortEnd } } = this.props;

        multiItemSortEnd(name, allValue, e.oldIndex, e.newIndex);
    }

    render() {
        return <FieldMultiValueWrapper {...this.props} helperClass="field-multi-values-row" onSortEnd={(e) => this.onSortEnd(e)} />;
    }
}