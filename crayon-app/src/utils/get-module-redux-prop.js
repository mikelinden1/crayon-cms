export default function getModuleReduxProp(state, ...props) {
    return props.reduce((p, c) => {
        return state[c];
    }, state[state.currentModule]);
}