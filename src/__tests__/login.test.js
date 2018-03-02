import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/auth-front/login';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Categories component', () => {
    const login = jest.fn();
    const wrapper = shallow(<Login login={login} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('submits data', () => {
        wrapper.find('Button').simulate('submit');
        
    });

    it('it renders state initially', () => {
        expect(wrapper.state().email).toEqual('');
        expect(wrapper.state().password).toEqual('');
    });

    it('should login a user', () => {
        const component = shallow(<Login />);
        const preventDefault = jest.fn();
        component.setState({
            email: 'hey@hey.com',
            password: '1234567',
        });
        component.find('Button').simulate('submit', { preventDefault });
        expect(toJson(component)).toMatchSnapshot();
    });
    
    
});