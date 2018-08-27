import React from 'react';
import PropTypes from 'prop-types';

import AddNew from 'components/add-new';
import NoMatchingItems from 'components/no-matching-items';
import TableView from 'components/table-view';
import GridView from 'components/grid-view';

export default class ItemList extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object.isRequired),
        filteredItems: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        const { currentView, items, filteredItems } = this.props;

        if (!items.length) {
            // show no items yet jumbotron
            return <AddNew displayAsJumbotron={true} />;
        }

        if (!filteredItems.length) {
            // show nothing matches jumbotron
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