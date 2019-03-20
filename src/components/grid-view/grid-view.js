import React from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

import GridViewCard from 'components/grid-view-card';

export default class GridView extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        config: PropTypes.object.isRequired
    };

    mapItems() {
        const { items } = this.props;

        return items.map((item, i) => <GridViewCard index={i} key={`grid-card-${item.id}`} item={item} />);
    }

    render() {
        const { config: { views: { grid: gridConfig } } } = this.props;

        if (!gridConfig) {
            console.error('Missing grid view config');
            return <Message error>Missing grid view config</Message>;
        }

        return (
            <div>
                <div className="grid-view">
                    {this.mapItems()}
                </div>
            </div>
        );
    }
}