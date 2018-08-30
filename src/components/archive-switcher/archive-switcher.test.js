import ArchiveSwitcher from './archive-switcher';
import sinon from 'sinon';

const props = {
    archiveMode: 'all',
    config: {
        itemName: 'test', 
        itemNamePlural: 'tests',
        archive: {
            field: 'start_date',
            archiveText: 'Archive',
            nonArchiveText: 'Future'
        }
    },
    actions: {
        setArchive: () => {}
    }
}

it('ArchiveSwitcher matches snapshot', () => {
    const wrapper = shallow(<ArchiveSwitcher {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('ArchiveSwitcher doesn\'t display if we don\'t have an archive config', () => {
    const propsNoArchive = {
        ...props,
        config: {
            archive: null
        }
    };

    const wrapper = shallow(<ArchiveSwitcher {...propsNoArchive} />);
    expect(wrapper.type()).toEqual(null)
});

it('ArchiveSwitcher button text matches config', () => {
    const wrapper = mount(<ArchiveSwitcher {...props} />);

    const allBtn = wrapper.find('Button').first().text();
    expect(allBtn).toEqual(`All ${props.config.itemNamePlural}`);

    const nonArchiveBtn = wrapper.find('Button').at(1).text();
    expect(nonArchiveBtn).toEqual(props.config.archive.nonArchiveText);

    const archiveBtn = wrapper.find('Button').at(2).text();
    expect(archiveBtn).toEqual(props.config.archive.archiveText);
});

it('ArchiveSwitcher calls setArchive and sends new archive state', () => {
    const spy = sinon.spy();
    const propsWithSpy = {
        ...props,
        actions: {
            setArchive: spy
        }
    };

    const wrapper = mount(<ArchiveSwitcher {...propsWithSpy} />);
    wrapper.find('Button').at(1).simulate('click');

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.getCall(0).args[0]).toEqual('active');
});