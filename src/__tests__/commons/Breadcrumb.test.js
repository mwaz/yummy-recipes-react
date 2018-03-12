import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BreadCrumbComponent from '../../components/common/BreadCrumbComponent';


describe('BreadCrumbComponent component', () => {
  const wrapper = shallow(<BreadCrumbComponent />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
