export default function getModuleReduxProp(state, ...props) {
    console.log('getModuleReduxProp', state, props);
    const moduleId = state.currentModule;
    console.log('module id', moduleId);

    if (!moduleId) {
        return null;
    }

    console.log('state', state[moduleId]);

    const r = props.reduce((p, c) => {
        return p[c];
    }, state[moduleId]);

    console.log('result', r);
    return r;
}