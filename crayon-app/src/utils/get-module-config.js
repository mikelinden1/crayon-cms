import config from 'config';

export default function getModuleConfig(id) {
    if (id && config.modules[id]) {
        return config.modules[id];
    }

    return false;
}