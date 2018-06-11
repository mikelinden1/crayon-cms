import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import ItemInfoBtn from 'components/item-info-btn';
import EditBtn from 'components/edit-btn';
import DeleteBtn from 'components/delete-btn';

export default class ActionBtns extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <div>
                <ItemInfoBtn item={item} />
                <EditBtn item={item} />
                <DeleteBtn item={item} />
            </div>
        );
    }
}