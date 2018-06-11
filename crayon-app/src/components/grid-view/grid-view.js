import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Alert } from 'reactstrap';

import GridViewCard from 'components/grid-view-card';

export default class GridView extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired,
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