import config from 'config';

export function getEnvVar(name) {
    return isLocal() ? config.localEnv[name] : config.prodEnv[name];
}

function isLocal() {
    return window.location.host.indexOf('localhost') !== -1;
}