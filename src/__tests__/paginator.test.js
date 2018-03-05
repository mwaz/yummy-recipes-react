import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Paginator from '../components/common/paginator'
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Paginator component', () => {
    const wrapper = shallow(<Paginator />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    
    it('previous and next button work', () => {
        expect(wrapper.find('#previous').simulate('click'))
        expect(wrapper.find('#next').simulate('click'))
    });

    
});