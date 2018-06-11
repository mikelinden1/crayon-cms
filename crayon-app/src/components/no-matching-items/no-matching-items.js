import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

export default class NoMatchingItems extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            clearFilters: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { actions: { clearFilters }, config: { itemName, itemNamePlural: itemP } } = this.props;

        const itemNamePlural = itemP ? itemP : itemName + 's';

        return (
            <div className="jumbotron text-center">
                <p className="lead">None of the {itemNamePlural.toLowerCase()} match your filtering.</p>
                <Button color="primary" onClick={() => clearFilters()}>Clear Filters</Button>
            </div>
        );
    }
}