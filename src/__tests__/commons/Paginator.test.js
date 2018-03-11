import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Paginator from '../../components/common/Paginator';

describe('Paginator component', () => {
  const wrapper = shallow(<Paginator />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('previous and next button work', () => {
    expect(wrapper.find('#previous').simulate('click'));
    expect(wrapper.find('#next').simulate('click'));
  });
});
