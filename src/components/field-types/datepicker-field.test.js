import DatePickerField from './datepicker-field';

const props = {
    label: 'Test',
    name: 'test',
    value: 'Wed, 14 Feb 1990 17:49:00 +0000',
    onChange: () => {},
    disabled: false,
    showTime: true,
    timeInterval: 15
};

it('DatePickerField matches snapshot', () => {
    const wrapper = shallow(<DatePickerField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
