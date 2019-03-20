import React from 'react';
import PropTypes from 'prop-types';

export default class RecordCount extends React.PureComponent {
    static propTypes = {
        numOfItems: PropTypes.number.isRequired,
        numOfItemsDisplayed: PropTypes.number.isRequired
    };

    render() {
        const { numOfItems, numOfItemsDisplayed, config: { itemName, itemNamePlural: itemP } } = this.props;

        const itemNamePlural = itemP ? itemP.toLowerCase() : itemName.toLowerCase() + 's';
        const itemName_total = numOfItems === 1 ? itemName.toLowerCase() : itemNamePlural;
            
        if (numOfItemsDisplayed !== numOfItems) {
            return <p style={{ textAlign: 'center' }}><small>Showing {numOfItemsDisplayed} of {numOfItems} {itemName_total}</small></p>;
        }

        return <p style={{ textAlign: 'center' }}><small>{numOfItemsDisplayed} {itemName_total}</small></p>;
    }
}