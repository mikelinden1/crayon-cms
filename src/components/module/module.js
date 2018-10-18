import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

import Spinner from 'components/spinner';

import AddNew from 'components/add-new';
import FilterSortSearch from 'components/filter-sort-search';
import Switchers from 'components/switchers';
import CurrentView from 'components/current-view';
import Paginator from 'components/paginator';
import ItemsPerPage from 'components/items-per-page';
import RecordCount from 'components/record-count';
import ItemModal from 'components/item-modal';
import BulkAdd from 'components/bulk-add';

export default class Main extends React.PureComponent {
    static propTypes = {
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        error: PropTypes.bool,
        currentModule: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            fetchItems: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { currentModule, fetched, fetching, actions: { fetchItems, startPolling } } = this.props;

        if (!fetched && !fetching) {
            fetchItems(currentModule);
        } else {
            startPolling(currentModule);
        }
    }

    componentWillUnmount() {
        // stop polling
        const { currentModule, actions: { stopPolling } } = this.props;

        stopPolling(currentModule);
    }

    render() {
        const { fetched, error, config } = this.props;

        if (!fetched) {
           return <p><Spinner /> Loading items...</p>;
        }

        if (error) {
            const { itemName, itemNamePlural: itemP } = config;

            const itemNamePlural = itemP ? itemP : itemName + 's';
            return <Alert color="danger">Error loading {itemNamePlural.toLowerCase()}</Alert>;
        }

        return (
            <div>
                <AddNew />
                <FilterSortSearch />
                <Switchers />
                <CurrentView />
                <Paginator />
                <ItemsPerPage />
                <RecordCount />
                <ItemModal />
                <BulkAdd />
            </div>
        );
    }
}