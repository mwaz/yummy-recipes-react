import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchForm from '../../components/common/SearchForm';

describe('SearchForm component', () => {
  const search = jest.fn();
  const wrapper = shallow(<SearchForm search={search} location={{}} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable button', () => {
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').simulate('click'));
  });
});

