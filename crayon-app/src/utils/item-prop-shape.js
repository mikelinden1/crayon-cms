import PropTypes from 'prop-types';
import config from 'config';

export default function itemPropShape(notRequired) {
    const id = 'widgets';

    return config.modules[id].itemProps.reduce((collector, i) => {
        switch (i.type) {
            case 'dropdown': {
                if (i.multiple) {
                    collector[i.name] = PropTypes.array;
                } else {
                    collector[i.name] = PropTypes.string;
                }
                break;
            }
            case 'tags': {
                collector[i.name] = PropTypes.array;
                break;
            }
            case 'checkbox': {
                collector[i.name] = PropTypes.bool;
                break;
            }
            default: {
                // everything else is a string
                collector[i.name] = PropTypes.string;
                break;
            }
        }

        if (i.required && !notRequired) {
            collector[i.name] = collector[i.name].isRequired;
        }

        return collector;
    }, {});
};
