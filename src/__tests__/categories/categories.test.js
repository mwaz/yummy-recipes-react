import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Categories from '../../components/category/Categories';
import ReusableModal from '../../components/common/categoryEditAddModal';
import DeleteComponent from '../../components/common/Delete';
import SearchForm from '../../components/common/Search';
import Paginator from '../../components/common/Paginator';

describe('Categories component', () => {
  const wrapper = shallow(<Categories />);
  const preventDefault = jest.fn();

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders divs', () => {
    expect(wrapper.find('div').length).toBe(9);
  });

  it('has clickable button that adds categories', () => {
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').simulate('click'));
    expect(wrapper.instance().handleAddCategories({ preventDefault }));
  });

  it('it renders category states initially', () => {
    expect(wrapper.state().category_name).toEqual('');
  });

  it('it edits a category', () => {
    const component = shallow(<ReusableModal />);
    expect(component.find('#add-update').simulate('click'));
    expect(wrapper.instance().editCategory({ preventDefault }));
  });

  it('it cancel editing a category', () => {
    const component = shallow(<ReusableModal />);
    expect(component.find('#cancel').simulate('click'));
    expect(wrapper.instance().handleHide());
  });

  it('it deletes a category', () => {
    const component = shallow(<DeleteComponent />);
    expect(component.find('#delete').simulate('click'));
    expect(wrapper.instance().handleDelete({ preventDefault }));
  });

  it('it calls the search method', () => {
    const component = shallow(<SearchForm />);
    expect(component.find('#btn-search').simulate('click'));
    expect(wrapper.instance().searchCategories({ preventDefault }));
  });

  it('it calls the pagination requests for next page', () => {
    const component = shallow(<Paginator />);
    expect(component.find('#next').simulate('click'));
    expect(wrapper.instance().getNextPage({ preventDefault }));
  });

  it('it calls the pagination requests for previous page', () => {
    const component = shallow(<Paginator />);
    expect(component.find('#previous').simulate('click'));
    expect(wrapper.instance().getPrevPage({ preventDefault }));
  });

  it('it checks if the component has categories', () => {
    expect(wrapper.instance().checkCategories());
  });
  it('it shows and hides modal', () => {
    expect(wrapper.instance().handleShow({ preventDefault }));
    expect(wrapper.instance().handleHide({ preventDefault }));
  });

  it('it renders categories fetched', () => {
    expect(wrapper.instance().getCategories());
  });
});
