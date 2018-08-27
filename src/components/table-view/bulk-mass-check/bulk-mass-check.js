import React from 'react';
import PropTypes from 'prop-types';

export default class BulkMassCheck extends React.Component {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired,
        actions: PropTypes.shape({
            toggleAllBulkCheckboxes: PropTypes.func.isRequired
        }).isRequired
    };

    toggleCheck() {
        const { items, checked, actions: { toggleAllBulkCheckboxes } } = this.props;

        if (checked) {
            toggleAllBulkCheckboxes([]);
        } else {
            const ids = items.reduce((all, item) => {
                all.push(item.id);
                return all;
            }, []);

            toggleAllBulkCheckboxes(ids);
        }
    }

    render() {
        const { checked } = this.props;

        const name = 'bulk-check-mass';

        return (
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={name} name={name} checked={checked} onChange={() => this.toggleCheck()} />
                <label className="custom-control-label" htmlFor={name}></label>
            </div>
        );
    }
};