import React from 'react';
import PropTypes from 'prop-types';
import { Message, Loader } from 'semantic-ui-react';


import AddNew from 'components/add-new';
import ViewSwitcher from 'components/view-switcher';
import ModuleRail from 'components/module-rail';
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
            return <div className="padded-container"><Loader active inline="centered" content='Loading Items' /></div>;
        }

        if (error) {
            const { itemName, itemNamePlural: itemP } = config;

            const itemNamePlural = itemP ? itemP : itemName + 's';
            return <div className="padded-container"><Message error>Error loading {itemNamePlural.toLowerCase()}</Message></div>;
        }

        const { moduleName } = config;

        return (
            <section className="module">
                <div className="module-left">
                    <div className="module-header">
                        <h1>{moduleName}</h1>
                        <ViewSwitcher />
                        <AddNew />
                    </div>
                    <div className="module-items">
                        <CurrentView />
                        <Paginator />
                        <ItemsPerPage />
                        <RecordCount />
                        <BulkAdd />
                    </div>
                </div>
                <ModuleRail />
                <ItemModal />
            </section>
        );
    }
}