import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

import config from 'config';

import { Button } from 'reactstrap';
import { faTrash, faBars } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

class FieldMultiValue extends React.PureComponent {
    static propTypes = {
        item: PropTypes.string.isRequired,
        isPhoto: PropTypes.bool.isRequired,
        deleteItem: PropTypes.func.isRequired
    };

    render() {
        const { item, isPhoto, deleteItem } = this.props;

        return (
            <li className="field-multi-values-row">
                {
                    isPhoto
                    ? <div className="item-thumb"><img src={`${config.uploadFullPath}/${item}`} alt="item thumb" /></div>
                    : null
                }
                <div className="item-name">{item}</div>
                <div className="btns">
                    <div className="drag-handle"><Icon icon={faBars} /></div>
                    <Button color="danger" className="btn-sm" onClick={() => deleteItem()}><Icon icon={faTrash} /></Button>
                </div>
            </li>
        );
    }
}

export default SortableElement(FieldMultiValue);