import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Categories from '../components/categories-front/categories';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Categories component', () => {
    const category= jest.fn();
    const wrapper = shallow( <Categories category={category} location={{}}   /> );
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    
});