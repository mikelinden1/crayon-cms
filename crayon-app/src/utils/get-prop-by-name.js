import config from 'config';

export default function getPropByName(name) {
    const { itemProps } = config;

    if (!itemProps) {
        return;
    }

    return itemProps.find((p) => {
        if (!p) { return false; }

        return p.name === name;
    });
}