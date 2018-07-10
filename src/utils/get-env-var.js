import env from 'config/env';

export function getEnvVar(name) {
    return isLocal() ? env.localEnv[name] : env.prodEnv[name];
}

function isLocal() {
    return window.location.host.indexOf('localhost') !== -1;
}