import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Register from '../components/auth-front/register';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('Register component', () => {
    const register = jest.fn();
    const wrapper = shallow(<Register register={register} location={{}} />);
    const preventDefault = jest.fn();
    
    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renders all the divs', () =>{
        expect(wrapper.find('div').length).toBe(8)
    })

    it('renders the Form Group elements', () => {
        expect(wrapper.find('FormGroup').length).toBe(4)
        expect(wrapper.find('Button').simulate('submit', { preventDefault }))
    })

    it('has the correct form fields', () => {
        expect(wrapper.find('#username')).toHaveLength(1);
        expect(wrapper.find('#email')).toHaveLength(1);
        expect(wrapper.find('#password')).toHaveLength(1);
        expect(wrapper.find('#cpassword')).toHaveLength(1);
    });

    it('it renders state initially', () => {
        expect(wrapper.state().email).toEqual('');
        expect(wrapper.state().password).toEqual('');
        expect(wrapper.state().cpassword).toEqual('');
        expect(wrapper.state().username).toEqual('');
    });

    it('should create a user', () => {
        const component = shallow(<Register />);
        const preventDefault = jest.fn();
        component.setState({
           email: 'hey@hey.com',
           username: 'mwaz',
           password: '1234567',
           cpassword:'123456',
        });
        component.find('Button').simulate('submit', { preventDefault });
        expect(toJson(component)).toMatchSnapshot();
    });
    
    it('state changes on input change', () => {
        const component = shallow(<Register />);
        component.find('Button').simulate('change', {
            target: {
                value: 'Change function'
            }
        });

        expect(toJson(component)).toMatchSnapshot();
    });

});