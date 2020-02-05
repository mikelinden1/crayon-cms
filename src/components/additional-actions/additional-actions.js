import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap'

export default class AdditionalActions extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item, config: { additionalActions } } = this.props;

        if (!additionalActions) {
            return null;
        }

        return (
            <React.Fragment>
                {additionalActions.map((btn, i) => {
                    return <Button key={`additional-action-${i}`} color={btn.color || 'primary'} disabled={item.deleting} onClick={() => btn.action(item)}>{btn.label}</Button>;
                })}
            </React.Fragment>
        );
    }
}