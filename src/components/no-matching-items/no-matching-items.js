import React from 'react';
import PropTypes from 'prop-types';

import { Button, Message } from 'semantic-ui-react';

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
            <Message 
                icon="thumbs down" 
                header="Nothing to show." 
                content={<div><p>None of the {itemNamePlural.toLowerCase()} match your filtering.</p><Button onClick={() => clearFilters()}>Clear Filters</Button></div>} 
            />
        );
    }
}