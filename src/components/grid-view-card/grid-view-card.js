import React from 'react';
import PropTypes from 'prop-types';
import ActionBtns from 'components/action-btns';
import RenderPropValue from 'components/render-prop-value';

export default class GridViewCard extends React.PureComponent {
    static propTypes = {
        item: PropTypes.PropTypes.object.isRequired,
        config: PropTypes.object.isRequired
    };

    render() {
        const { item, config } = this.props;
        const { views: { grid: { layout: gridViewLayout, showId } } } = config;

        return (
            <div key={`grid-item-${item.id}`} className="card border-secondary">
                {
                    gridViewLayout.map((prop) => {
                        const gridTag = prop.gridTag ? prop.gridTag : 'div';
                        const displayType = prop.displayType ? prop.displayType : 'text';

                        const itemValueRendered = <RenderPropValue column={prop} item={item} />;

                        const itemRendered = React.createElement(
                            gridTag,
                            {},
                            itemValueRendered
                        );

                        return (
                            <div key={`grid-item-prop-${prop.name}`} className={`card-body ${displayType}`}>
                                {itemRendered}
                            </div>
                        );
                    })
                }
                <div className="card-footer text-right">
                    {
                    showId
                    ? <div className="grid-item-id">#{item.id}</div>
                    : null
                    }
                    <ActionBtns item={item} />
                </div>
            </div>
        );
    }
}