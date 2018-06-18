import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import getPropByName from 'utils/get-prop-by-name';
import { Button } from 'reactstrap';
import { faTrash, faBars } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

export default class FieldMultiValue extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        currentModule: PropTypes.string.isRequired,
        allValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            setMultiItemProp: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { allValue, name, currentModule } = this.props;

        const theProp = getPropByName(currentModule, name);

        if (!allValue || !allValue.length || typeof allValue === 'string') {
            return null;
        }

        return (
            <ul className="field-multi-values">
                {allValue.map((item, i) => {
                    return (
                        <li key={`multi-item-${i}`}>
                            {
                                theProp.type === 'photo'
                                ? <div className="item-thumb"><img src={`${config.uploadFullPath}/${item}`} alt="item thumb" /></div>
                                : null
                            }
                            <div className="item-name">{item}</div>
                            <div className="btns">
                                <div className="drag-handle"><Icon icon={faBars} /></div>
                                <Button color="danger" className="btn-sm"><Icon icon={faTrash} /></Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}