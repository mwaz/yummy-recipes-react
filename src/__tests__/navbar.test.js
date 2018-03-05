import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Navbar from '../components/common/navbar';
import toJson, { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom'; 

describe('Navbar component', () => {
    const wrapper = shallow( <Navbar  />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    
    it('it resets the password', () => {
        expect(wrapper.find('#reset').simulate('click'))
        expect(wrapper.instance().resetPassword({ preventDefault }))

    });
    it('it logs out a user', () => {
        expect(wrapper.instance().handleLogout({ preventDefault }))

    });
    
    it('it shows and hides modal', () => {
        expect(wrapper.instance().handleShow({ preventDefault }))
        expect(wrapper.instance().handleHide({ preventDefault }))
    });
    
    it('check it renders default states', () => {
        expect(wrapper.state('password')).toEqual('');
        expect(wrapper.state('cpassword')).toEqual('');
    });
    it('check it changes states', () => {
        wrapper.setState({password: '123456', cpassword: '123456'})
        expect(wrapper.state('password')).toEqual('123456');
        expect(wrapper.state('cpassword')).toEqual('123456');
    });
});