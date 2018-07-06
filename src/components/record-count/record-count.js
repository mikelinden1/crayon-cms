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
            const itemName_display = numOfItemsDisplayed === 1 ? itemName.toLowerCase() : itemNamePlural;
            return <p className="text-center"><small>{numOfItemsDisplayed} {itemName_display} of {numOfItems} total {itemName_total}</small></p>;
        }

        return <p className="text-center"><small>{numOfItemsDisplayed} {itemName_total}</small></p>;
    }
}