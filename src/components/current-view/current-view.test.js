import CurrentView from './current-view';

it('CurrentView matches snapshot', () => {
    const wrapper = shallow(<CurrentView items={[{}, {}]} filteredItems={[{}]} />);
    expect(wrapper).toMatchSnapshot();
});

it('CurrentView shows AddNew Jumbotron if no items', () => {
    const wrapper = shallow(<CurrentView items={[]} filteredItems={[]} />);
    expect(wrapper).toMatchSnapshot();
});

it('CurrentView shows NoMatchingItems Jumbotron if no filtered items', () => {
    const wrapper = shallow(<CurrentView items={[{}, {}]} filteredItems={[]} />);
    expect(wrapper).toMatchSnapshot();
});

it('CurrentView shows table view', () => {
    const wrapper = shallow(<CurrentView items={[{}, {}]} filteredItems={[{}]} currentView="table" />);
    expect(wrapper).toMatchSnapshot();
});

it('CurrentView shows grid view', () => {
    const wrapper = shallow(<CurrentView items={[{}, {}]} filteredItems={[{}]} currentView="grid" />);
    expect(wrapper).toMatchSnapshot();
});