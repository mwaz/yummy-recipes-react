import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DeleteComponent from '../../components/common/Delete';


describe('DeleteComponent component', () => {
  const del = jest.fn();
  const wrapper = shallow(<DeleteComponent del={del} location={{}} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable button', () => {
    expect(wrapper.find('Button').length).toBe(2);
  });
});
