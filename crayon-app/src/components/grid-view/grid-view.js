import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Alert } from 'reactstrap';
import config from 'config';

import GridViewCard from './grid-view-card';

export default class GridView extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired
    };

    mapItems() {
        const { items } = this.props;

        return items.map((item, i) => <GridViewCard index={i} key={`grid-card-${item.id}`} item={item} />);
    }

    render() {
        const { views: { grid: gridConfig } } = config;

        if (!gridConfig) {
            console.error('Missing grid view config');
            return <Alert color="danger">Missing grid view config</Alert>;
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