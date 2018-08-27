import React from 'react';
import PropTypes from 'prop-types';

export default class BulkCheck extends React.Component {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        actions: PropTypes.shape({
            toggleBulkCheckbox: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { checked, id, actions: { toggleBulkCheckbox } } = this.props;

        const name = `bulk-check-${id}`;

        return (
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={name} name={name} checked={checked} onChange={() => toggleBulkCheckbox(id)} />
                <label className="custom-control-label" htmlFor={name}></label>
            </div>
        );
    }
};