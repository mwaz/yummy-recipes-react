import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Private from '../../containers/private';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Login component', () => {
    const wrapper = shallow(<Private />);

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});