import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import TableRows from '../table-rows';

export default class TableBody extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired,
        actions: PropTypes.shape({
            sortEnd: PropTypes.func.isRequired
        }).isRequired
    };

    onSortEnd(e) {
        const { items, actions: { sortEnd } } = this.props;

        sortEnd(items, e.oldIndex, e.newIndex);
    }

    render() {
        const { items } = this.props;

        return <TableRows items={items} useDragHandle={true} helperClass="helper" onSortEnd={(e) => this.onSortEnd(e)} />;
    }
}