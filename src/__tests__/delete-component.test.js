import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DeleteComponent from '../components/common/delete';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('DeleteComponent component', () => {
    const del = jest.fn();
    const wrapper = shallow(<DeleteComponent del={del} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});