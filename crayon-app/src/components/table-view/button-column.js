import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import ActionBtns from 'components/action-btns';

export default class ButtonColumn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <td key={`${item.id}-buttons`} className="buttons text-right">
                <ActionBtns item={item} />
            </td>
        );
    }
};