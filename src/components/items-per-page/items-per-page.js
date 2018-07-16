import React from 'react';
import PropTypes from 'prop-types';

export default class Paginator extends React.PureComponent {
    static propTypes = {
        itemsPerPage: PropTypes.number.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setItemsPerPage: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { itemsPerPage, config: { itemNamePlural, capabilities: { reorderable } }, actions: { setItemsPerPage } } = this.props;

        if (reorderable) {
            return null;
        }

        return (
            <div style={{margin: '20px 0', textAlign: 'center'}}>
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
                    <option value={6}>6 {itemNamePlural}</option>
                    <option value={12}>12 {itemNamePlural}</option>
                    <option value={24}>24 {itemNamePlural}</option>
                    <option value={48}>48 {itemNamePlural}</option>
                    <option value={96}>96 {itemNamePlural}</option>
                    <option value="">All {itemNamePlural}</option>
                </select>
            </div>
        );
    }
}