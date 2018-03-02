import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/auth-front/login';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Logins component', () => {
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
    
    it('has clickable button', () => {
        expect(wrapper.find('Button').length).toBe(1)
        expect(wrapper.find('Button').simulate('click'))
    })

    describe('expect login inputs to change states on target', () => {

        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow(<Login />);
            wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'hey@sema.com' } });
            wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'password123456' } });

            expect(wrapper.state('email')).toEqual('hey@sema.com');
            expect(wrapper.state('password')).toEqual('password123456');
        });
    });
    
});

