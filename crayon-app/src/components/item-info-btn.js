import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';
import moment from 'moment';

import Icon from 'components/icon';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';

export default class ItemInfoBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <div className="item-info-btn">
                <Icon icon={faInfoCircle} />
                <div className="item-info-hover">
                    <div className="label">Created By</div>
                    <div className="label-value">{item.created_by}</div>
                    <div className="label">Created On</div>
                    <div className="label-value">{moment(item.created_at).format('LLLL')}</div>
                    <div className="label">Modified By</div>
                    <div className="label-value">{item.modified_by}</div>
                    <div className="label">Modified On</div>
                    <div className="label-value">{moment(item.modified_at).format('LLLL')}</div>
                </div>
            </div>
        );
    }
}