import Header from './header';
import sinon from 'sinon';

const props = {
    loggedIn: true,
    user: {
        name: 'Mike'
    },
    actions: {
        logout: () => {}
    }
}
it('Header matches snapshot', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('Header displays welcome correctly', () => {
    const wrapper = mountWrap(<Header {...props} />);
    const welcome = wrapper.find('.welcome').text();
    expect(welcome).toEqual(`Hi, ${props.user.name}!`);
});

it('Header calls logout', () => {
    const spy = sinon.spy();

    const propsWithSpy = {
        ...props,
        actions: {
            logout: spy
        }
    };

    const wrapper = mountWrap(<Header {...propsWithSpy} />);
    wrapper.find('.logout-btn').simulate('click');

    expect(spy.calledOnce).toBeTruthy();
});