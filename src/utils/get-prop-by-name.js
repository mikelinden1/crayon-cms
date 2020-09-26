import getModuleConfig from './get-module-config';

export default function getPropByName(moduleId, name) {
    const { itemProps } = getModuleConfig(moduleId);

    if (!itemProps) {
        return;
    }

    if (name.indexOf('__') !== -1) {
        // we're looking for a child property in a repeater
        const nameParts = name.split('__');

        if (nameParts.lengt < 2) {
            return null;
        }

        const repeater = itemProps.find((p) => {
            if (!p) { return false; }
    
            return p.name === nameParts[0];
        }) || {};

        return (repeater.itemProps || []).find((p) => {
            if (!p) { return false; }
    
            return p.name === name;
        });
    }

    return itemProps.find((p) => {
        if (!p) { return false; }

        return p.name === name;
    });
};
