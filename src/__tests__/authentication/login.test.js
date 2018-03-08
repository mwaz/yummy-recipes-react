import React from 'react';
import toJson, { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import Login from '../../components/auth/Login';

describe('Login component', () => {
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
    wrapper.setState({
      email: 'hey@hey.com',
      password: '1234567',
    });
    wrapper.find('Button').simulate('submit', { preventDefault });
    expect(wrapper.instance().handleClick());
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable button which logs in a user', () => {
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').simulate('click'));
  });

  it('should respond to change event and change the state of the Login Component', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'hey@sema.com' } });
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'password123456' } });
    expect(wrapper.state('email')).toEqual('hey@sema.com');
    expect(wrapper.state('password')).toEqual('password123456');
  });

  it('should find a toast conatiner', () => {
    expect(wrapper.find(ToastContainer).length).toBe(1);
  });
});

