import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Field from 'components/field';

export default class FieldMulti extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            setMultiItemProp: PropTypes.func.isRequired
        }).isRequired
    };

    addToMulti(e) {
        e.preventDefault();

        const { name, allValue: currValue, value, actions: { setItemProp, setMultiItemProp } } = this.props;

        const allValue = typeof currValue === 'undefined' || currValue === '' ? [] : currValue;

        allValue.push(value);

        setMultiItemProp(name, '');
        setItemProp(name, allValue);
    }

    render() {
        const { name, allValue: inputValue, actions: { setMultiItemProp } } = this.props;
        const fieldProps = {...this.props};

        fieldProps.onChange = (val) => {
            setMultiItemProp(name, val);
        };

        let value = inputValue;
        if (value && typeof value === 'string') {
            value = JSON.parse(value);
        }

        if (!value || value === '') {
            value = [];
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <Field {...fieldProps} />
                    </div>
                    <div className="col-md-3">
                        <Button color="success" className="btn-block" onClick={(e) => this.addToMulti(e)}>Add</Button>
                    </div>
                </div>
                <ul>
                    {value.map((item, i) => <li key={`multi-item-${i}`}>{item}</li>)}
                </ul>
            </div>
        );
    }
}