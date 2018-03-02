import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Categories from '../components/categories-front/categories';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

describe('Categories component', () => {
    const category= jest.fn();
    const wrapper = shallow( <Categories category={category} location={{}}   /> );
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renders divs', () => {
        expect(wrapper.find('div').length).toBe(9)
    });

    it('has clickable button', () => {
        expect(wrapper.find('Button').length).toBe(1)
        expect(wrapper.find('Button').simulate('click'))
    });

    
});


