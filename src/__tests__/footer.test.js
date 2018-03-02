import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Footer from '../components/common/footer';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Footer component', () => {
    const footer = jest.fn();
    const wrapper = shallow(<Footer footer={footer} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});