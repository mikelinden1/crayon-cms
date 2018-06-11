import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

export default class RteField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    componentWillMount() {
        const { value: inputVal } = this.props;
        const value = inputVal ? RichTextEditor.createValueFromString(inputVal, 'html') : RichTextEditor.createEmptyValue();

        this.setState({ value });
    }

    handleChange(e) {
        const { onChange } = this.props;

        this.setState({ value: e });

        onChange(e.toString('html'));
    }

    render() {
        const { value, disabled } = this.state;

        return <RichTextEditor disabled={disabled} value={value} onChange={(e) => this.handleChange(e)} />;
    }
}