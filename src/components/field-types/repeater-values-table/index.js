import React from 'react';

import RepeaterValuesWrapper from './repeater-values-wrapper';
import { arrayMove } from 'react-sortable-hoc';

export default class RepeaterValuesTable extends React.PureComponent {
    onSortEnd(e) {
        const newItems = arrayMove([...this.props.items], e.oldIndex, e.newIndex);
        this.props.onChange(newItems);
    }

    render() {
        return <RepeaterValuesWrapper {...this.props} helperClass="field-multi-values-row" onSortEnd={(e) => this.onSortEnd(e)} />;
    }
}