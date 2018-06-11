import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import RenderPropValue from 'components/render-prop-value';

export default class TableCell extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired,
        column: PropTypes.shape({
            heading: PropTypes.string,
            name: PropTypes.string.isRequired,
            displayType: PropTypes.string,
            altProp: PropTypes.string,
            alignment: PropTypes.string
        }).isRequired
    };

    render() {
        const { column, item } = this.props;

        const alignment = column.alignment ? `text-${column.alignment}` : 'text-left';
        return <td key={`${item.id}-${column.name}-cell`} className={alignment}><RenderPropValue column={column} item={item} /></td>
    }
};