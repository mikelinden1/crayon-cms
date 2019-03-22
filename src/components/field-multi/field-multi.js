import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';

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

    componentWillMount() {
        const { name, allValue: inputValue, actions: { setItemProp } } = this.props;

        let value = inputValue;
        if (value && typeof value === 'string') {
            value = JSON.parse(value);
            setItemProp(name, value, true);
            return;
        }
    }

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
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Field {...fieldProps} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button color="green" fluid onClick={(e) => this.addToMulti(e)}>Add</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <FieldMultiValues name={name} />
            </div>
        );
    }
}