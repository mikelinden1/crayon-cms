import React from 'react';
import PropTypes from 'prop-types';

import FieldSingle from 'components/field-single';
import FieldMulti from 'components/field-multi';

export default class FieldGroup extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        helpText: PropTypes.string,
        validationErrors: PropTypes.array
    };

    getField() {
        const { many } = this.props;

        return many ? <FieldMulti {...this.props} /> : <FieldSingle {...this.props} />;
    }

    render() {
        const { label, type, helpText: help, validationErrors } = this.props;

        let field = this.getField();

        if (type === 'checkbox') {
            return field;
        }

        const fieldClasses = ['form-group'];

        let errorText = '';
        if (validationErrors.length) {
            fieldClasses.push('has-error');
            const errorTextP = validationErrors.map((e, i) => <p key={`errormsg-${e.itemName}-${i}`}>{e.msg}</p>);

            errorText = <div className="invalid-feedback">{errorTextP}</div>;
        }

        const helpText = help ? <p><small><em>{help}</em></small></p> : null;

        return (
            <div className={fieldClasses.join(' ')}>
                <label className="control-label">{label}</label>
                {field}
                {helpText}
                {errorText}
            </div>
        );
    }
}