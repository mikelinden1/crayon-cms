import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getEnvVar } from 'utils/get-env-var';

import { faCheckSquare as checkedIcon, faSquare as uncheckedIcon } from '@fortawesome/fontawesome-free-solid';
import Icon from 'components/icon';
import IconLeft from 'components/icon-left';

import getPropByName from 'utils/get-prop-by-name';

export default class RenderPropValue extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        column: PropTypes.shape({
            heading: PropTypes.string,
            name: PropTypes.string.isRequired,
            displayType: PropTypes.string,
            altProp: PropTypes.string
        }).isRequired
    };

    render() {
        const { column, item, config: { id: moduleId, itemName } } = this.props;
        const columnProp = getPropByName(moduleId, column.name);

        let value = item[column.name];

        if (columnProp && columnProp.many) {
            try {
                value = JSON.parse(value);
                value = value.length ? value[0] : null;
            } catch(e) {
                console.log(`Error parsing column value for ${column.name} (many is true)`, e);
            }
        }

        const displayType = column.displayType;

        if (!displayType) {
            return value ? value : null;
        }

        switch (displayType) {
            case 'boolean-labelright':
            case 'boolean':
                const parsedValue = !value || (typeof value === 'string' && value.toLowerCase() === 'no') || (typeof value === 'string' && value.toLowerCase() === 'false') || (typeof value === 'string' && value.toLowerCase() === 'off') ? false : true;
                const icon = parsedValue ? checkedIcon : uncheckedIcon;

                if (displayType === 'boolean-labelright') {
                    return <IconLeft icon={icon}>{column.heading}</IconLeft>;
                } else {
                    return <div className="text-center" style={{fontSize: '20px'}}><Icon icon={icon} /></div>;
                }
            case 'image-fullwidth':
            case 'image':

                if (!value || value === '') {
                    return <div className="no-photo">No Photo</div>;
                }

                if (!columnProp) {
                    console.error('Missing prop in photos', column.name);

                    return 'Missing prop?';
                }

                const width = displayType === 'image' ? 125 : '100%';

                const protocolRegex = /(http(s?)):\/\//gi;
                const previewImage = protocolRegex.test(value) ? value : `${getEnvVar('uploadFullPath')}/${value}`;

                const alt = column.altProp ? `${item[column.altProp]} - ${columnProp.label}` : `${itemName} - ${columnProp.label}`;
                return <img src={previewImage} width={width} alt={alt} className="table-thumb" />;
            case 'date':
                if (!value) {
                    return null;
                }

                return moment.utc(value).format('MMMM Do, YYYY');
            case 'datetime':
                if (!value) {
                    return null;
                }

                return moment.utc(value).format('MMMM Do, YYYY h:mm a');
            case 'truncate':
                if (!value) {
                    return null;
                }

                const length = column.length ? column.length : 100;

                let clipped = value.toString().substr(0, length);
                if (value.length > length) {
                    clipped += '...';
                }

                return clipped;
            default:
                if (value && value.length) {
                    return value;
                } else {
                    return null;
                }
        }
    }
}