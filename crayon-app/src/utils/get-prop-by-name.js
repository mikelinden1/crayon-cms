import getModuleConfig from './get-module-config';

export default function getPropByName(moduleId, name) {
    const { itemProps } = getModuleConfig(moduleId);

    if (!itemProps) {
        return;
    }

    return itemProps.find((p) => {
        if (!p) { return false; }

        return p.name === name;
    });
}