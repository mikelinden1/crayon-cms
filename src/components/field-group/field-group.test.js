import FieldGroup from './field-group';

const props = {
    label: 'Test Field',
    name: 'test-field',
    helpText: 'Help!',
    actions: {
        showMediaPicker: () => {}
    }
};

it('FieldGroup matches snapshot', () => {
    const wrapper = shallow(<FieldGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('FieldGroup shows the correct text', () => {
    const wrapper = shallow(<FieldGroup {...props} />);

    const label = wrapper.find('.control-label').text();
    expect(label).toEqual(props.label);
    
    const helpText = wrapper.find('.help-text').text();
    expect(helpText).toEqual(props.helpText);
});

it('FieldGroup with an error matches snapshot', () => {
    const propsWithErrors = {
        ...props,
        validationErrors: [
            {
                itemName: 'name',
                msg: 'Name is required'
            }
        ]
    };
    const wrapper = shallow(<FieldGroup {...propsWithErrors} />);
    expect(wrapper).toMatchSnapshot();
});

it('FieldGroup with many matches snapshot', () => {
    const propsWithMany = {
        ...props,
        many: true
    };
    const wrapper = shallow(<FieldGroup {...propsWithMany} />);
    expect(wrapper).toMatchSnapshot();
});