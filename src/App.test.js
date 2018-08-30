import App from './App';

it('App matches snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
});