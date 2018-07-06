import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class ArchiveSwitcher extends React.PureComponent {
    static propTypes = {
        archiveMode: PropTypes.string.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setArchive: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { archiveMode, config, actions: { setArchive } } = this.props;
        const { itemName, itemNamePlural: itemP, archive } = config;
        const itemNamePlural = itemP ? itemP : itemName + 's';

        if (!archive) {
            return null;
        }

        const { archiveText: at, nonArchiveText: nat } = archive;

        const archiveText = at ? at : 'Archive';
        const nonArchiveText = nat ? nat : 'Active';

        return (
            <div className="btn-group" style={{border: '1px solid #1a1a1a'}}>
                <Button onClick={() => setArchive('all')} color={archiveMode === 'all' ? 'primary' : 'secondary'}>
                    All {itemNamePlural}
                </Button>
                <Button onClick={() => setArchive('active')} color={archiveMode === 'active' ? 'primary' : 'secondary'}>
                    {nonArchiveText}
                </Button>
                <Button onClick={() => setArchive('inactive')} color={archiveMode === 'inactive' ? 'primary' : 'secondary'}>
                    {archiveText}
                </Button>
            </div>
        );
    }
}