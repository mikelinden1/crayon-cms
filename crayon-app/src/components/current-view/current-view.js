import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import AddNew from 'components/add-new';
import NoMatchingItems from 'components/no-matching-items';
import TableView from 'components/table-view';
import GridView from 'components/grid-view';

export default class ItemList extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired,
        filteredItems: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired
    };

    render() {
        const { currentView, items, filteredItems } = this.props;

        if (!items.length) {
            return <AddNew displayAsJumbotron={true} />;
        }

        if (!filteredItems.length) {
            return <NoMatchingItems />;
        }

        switch (currentView) {
            case 'grid':
                return <GridView />;
            default:
                return <TableView />
        }
    }
}