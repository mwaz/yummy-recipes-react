import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SearchForm from '../components/common/search';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('SearchForm component', () => {
    const search = jest.fn();
    const wrapper = shallow(<SearchForm search={search} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('has clickable button', () => {
        expect(wrapper.find('Button').length).toBe(1)
        expect(wrapper.find('Button').simulate('click'))
    })
});


