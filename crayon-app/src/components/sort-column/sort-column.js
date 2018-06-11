import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

export default class SortColumn extends React.PureComponent {
    static propTypes = {
        currentSort: PropTypes.shape({
            field: PropTypes.string.isRequired,
            desc: PropTypes.bool
        }).isRequired,
        fieldName: PropTypes.string.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setSort: PropTypes.func.isRequired
        }).isRequired
    };

    setSort(desc) {
        const { fieldName: field, actions: { setSort } } = this.props;

        const newSort = {
            field,
            desc
        };

        setSort(newSort);
    }

    render() {
        const { config: { capabilities: { reorderable }, filtering: { sortable } } } = this.props;

        if (reorderable || !sortable) {
            return null;
        }

        const { currentSort, fieldName: field } = this.props;

        const baseStyle = { marginBottom: '0', display: 'block', color: '#999', outline: 'none', lineHeight: '1px' };
        const activeStyle = Object.assign({}, baseStyle, { color: '#000' });

        return (
            <div style={{display:'inline-block', verticalAlign: 'middle', marginLeft: '7px', cursor: 'pointer'}}>
                <button style={currentSort.field === field && !currentSort.desc ? activeStyle : baseStyle} className="link-btn" onClick={() => this.setSort(false)}><Icon icon={faCaretUp} /></button>
                <button style={currentSort.field === field && currentSort.desc ? activeStyle : baseStyle} className="link-btn" onClick={() => this.setSort(true)}><Icon icon={faCaretDown} /></button>
            </div>
        );
    }
}