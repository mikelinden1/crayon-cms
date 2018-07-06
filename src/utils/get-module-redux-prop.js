export default function getModuleReduxProp(state, ...props) {
    const moduleId = state.currentModule;

    if (!moduleId) {
        return null;
    }

    return props.reduce((p, c) => {
        return p[c];
    }, state[moduleId]);
}