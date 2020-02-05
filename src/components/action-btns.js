import React from 'react';
import PropTypes from 'prop-types';

import AdditionalActions from 'components/additional-actions';
import EditBtn from 'components/edit-btn';
import DeleteBtn from 'components/delete-btn';

export default class ActionBtns extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <div>
                <AdditionalActions item={item} />
                <EditBtn item={item} />
                <DeleteBtn item={item} />
            </div>
        );
    }
}