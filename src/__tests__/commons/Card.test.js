import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CardComponent from '../../components/common/CardComponent';


describe('CardComponent component', () => {
  const wrapper = shallow(<CardComponent />);
  const preventDefault = jest.fn();

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should check edit button works', () => {
    wrapper.find('#edit').simulate('click', { preventDefault });
  });
  it('Should check delete button works ', () => {
    wrapper.find('#delete').simulate('click', { preventDefault });
  });
});
