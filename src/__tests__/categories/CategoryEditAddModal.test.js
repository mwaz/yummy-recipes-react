import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CategoryEditAddModal from '../../components/common/CategoryEditAddModal';
import Categories from '../../components/category/Categories';


describe('ReusableModal component', () => {
  const wrapper = shallow(<CategoryEditAddModal />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders buttons in the reusable modal', () => {
    expect(wrapper.find('#add-update').simulate('click'));
    expect(wrapper.find('#cancel').simulate('click'));
  });

  it('test that modal accepts props', () => {
    const category = {
      category_name: 'category_name',
    };
    const component = shallow(<Categories category_name={category} />);
    expect(component).toMatchSnapshot();
  });
});
