import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

import { getEnvVar } from 'utils/get-env-var';

import { Button, Icon } from 'semantic-ui-react';


class FieldMultiValue extends React.PureComponent {
    static propTypes = {
        item: PropTypes.string.isRequired,
        isPhoto: PropTypes.bool.isRequired,
        deleteItem: PropTypes.func.isRequired
    };

    render() {
        const { item, isPhoto, deleteItem } = this.props;

        const protocolRegex = /(http(s?)):\/\//gi;
        const previewImage = protocolRegex.test(item) ? item : `${getEnvVar('uploadFullPath')}/${item}`;

        return (
            <li className="field-multi-values-row">
                {
                    isPhoto
                    ? <div className="item-thumb"><img src={previewImage} alt="item thumb" /></div>
                    : null
                }
                <div className="item-name">{item}</div>
                <div className="btns">
                    <div className="drag-handle"><Icon name="bars" /></div>
                    <Button basic color="red" icon="trash" size="small" onClick={() => deleteItem()} />
                </div>
            </li>
        );
    }
}

export default SortableElement(FieldMultiValue);