import React from 'react';
import PropTypes from 'prop-types';
import ActionBtns from 'components/action-btns';
import RenderPropValue from 'components/render-prop-value';

import { Card, Image } from 'semantic-ui-react';

export default class GridViewCard extends React.PureComponent {
    static propTypes = {
        item: PropTypes.PropTypes.object.isRequired,
        config: PropTypes.object.isRequired
    };

    render() {
        const { item, config } = this.props;
        const { views: { grid: { photo, header, meta, description } } } = config;
        
        return (
            <Card fluid key={`grid-item-${item.id}`}>
                <Image src={item[photo]} />
                <Card.Content>
                    <Card.Header>
                        <RenderPropValue column={header} item={item} />
                    </Card.Header>
                    <Card.Meta>
                        <RenderPropValue column={meta} item={item} />
                    </Card.Meta>
                    <Card.Description>
                        <RenderPropValue column={description} item={item} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <ActionBtns item={item} />
                </Card.Content>
            </Card>
        );
    }
}