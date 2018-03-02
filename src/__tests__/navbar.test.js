import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Navbar from '../components/common/navbar';
import toJson, { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom'; 

describe('Navbar component', () => {
    const navbar = jest.fn();
    const wrapper = shallow( <Navbar navbar={navbar} location={{}} getItem={jest.fn()} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});