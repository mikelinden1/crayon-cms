import getModuleConfig from './get-module-config';

export function getModuleHooks(id) {
    const moduleConfig = getModuleConfig(id) || {};
    const hooks = moduleConfig.hooks || {};

    return hooks;
}

export function getModuleHook(id, hook) {
    const hooks = getModuleHooks(id);

    if (hooks[hook] && typeof hooks[hook] === 'function') {
        return hooks[hook];
    }

    return false;
}