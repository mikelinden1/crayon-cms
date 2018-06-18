import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Field from 'components/field';
import FieldMultiValues from 'components/field-multi-values';

export default class FieldMulti extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        allValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            setMultiItemProp: PropTypes.func.isRequired
        }).isRequired
    };

    addToMulti(e) {
        e.preventDefault();

        const { name, allValue: currValue, value, actions: { setItemProp, setMultiItemProp } } = this.props;

        if (value === '') {
            window.alert('Cannot add a blank value.');
            return false;
        }

        const allValue = Object.prototype.toString.call(currValue) === '[object Array]' ? currValue : [];
        const newValue = [...allValue];
        newValue.push(value);

        setMultiItemProp(name, '');
        setItemProp(name, newValue);
    }

    render() {
        const { name, actions: { setMultiItemProp } } = this.props;
        const fieldProps = {...this.props};

        fieldProps.onChange = (val) => {
            setMultiItemProp(name, val);
        };

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
                <FieldMultiValues name={name} />
            </div>
        );
    }
}