import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import Spinner from 'components/spinner';

export default class MediaName extends React.PureComponent {
    static propTypes = {
        selectedItem: PropTypes.object,
        newName: PropTypes.string,
        editing: PropTypes.bool,
        actions: PropTypes.shape({
            toggleEdit: PropTypes.func.isRequired,
            save: PropTypes.func.isRequired,
            setNewName: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { selectedItem, newName, saving, editing, actions: { toggleEdit, save, setNewName } } = this.props;

        if (editing) {
            if (!newName) {
                return null;
            }

            const saveBtnText = saving ? <Spinner /> : <span>Save</span>;
            return (
                <div className="edit-media-name">
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="form-control" />
                    <Button color="primary" onClick={() => toggleEdit()} disabled={saving}>Cancel</Button>
                    <Button color="success" onClick={() => save(selectedItem.id, newName)} disabled={saving}>{saveBtnText}</Button>
                </div>
            );
        }

        if (!selectedItem) {
            return null;
        }

        return <h3 onClick={() => toggleEdit()} className="edit-cursor">{selectedItem.name}</h3>;
    }
}