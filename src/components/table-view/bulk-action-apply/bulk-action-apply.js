import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

export default class BulkActionApply extends React.Component {
    static propType = {
        selectedItems: PropTypes.array.isRequired,
        selectedAction: PropTypes.string,
        actions: PropTypes.shape({
            selectBulkAction: PropTypes.func.isRequired,
            applyBulkAction: PropTypes.func.isRequired
        }).isRequired
    };

    applyAction() {
        const { selectedAction, actions: { applyBulkAction } } = this.props;
        applyBulkAction(selectedAction);
    }

    render() {
        const { selectedItems, selectedAction, actions: { selectBulkAction } } = this.props;

        if (!selectedItems || !selectedItems.length) {
            return null;
        }

        return (
            <div className="bulk-actions-wrapper">
                <select name="bulk-action-apply-select" value={selectedAction} onChange={(e) => selectBulkAction(e.target.value)}>
                    <option value="">Bulk Actions</option>
                    <option value="bulkDelete">Delete</option>
                    <option value="bulkEdit">Edit</option>
                </select>
                <Button disabled={!selectedAction} color="primary" className="btn-sm" onClick={() => this.applyAction() }>Apply</Button>
            </div>
        );
    }
};