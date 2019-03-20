import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

export default class Paginator extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setItemsPerPage: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { config: { itemsPerPage, itemNamePlural, capabilities: { reorderable } }, actions: { setItemsPerPage } } = this.props;

        if (reorderable) {
            return null;
        }

        const perPages = [6, 12, 24, 48, 96];

        const options = perPages.map(i => { 
            return {
                key: `per-page-option-${i}`,
                value: i,
                text: `${i} ${itemNamePlural} per page`
            };
        })

        return (
            <div style={{margin: '20px 0', textAlign: 'center'}}>  
                <Dropdown 
                    options={options} 
                    defaultValue={itemsPerPage} 
                    onChange={(e, data) => setItemsPerPage(data.value)} 
                />
            </div>
        );
    }
}