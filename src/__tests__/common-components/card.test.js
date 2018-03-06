import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CardComponent from '../../components/common/card';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('CardComponent component', () => {
    const card = jest.fn();
    const wrapper = shallow(<CardComponent card={card} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should check edit button works', () => {
        wrapper.find('#edit').simulate('click', { preventDefault });
    });
    it('Should check delete button works ', () => {
        wrapper.find('#delete').simulate('click', { preventDefault });
    });

    
  
   

});