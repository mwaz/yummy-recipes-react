import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import ReusableModal from '../../components/common/category-edit-add-modal';
import toJson, { shallowToJson } from 'enzyme-to-json';
import Categories from '../../components/categories-front/categories';

describe('ReusableModal component', () => {
    const modals = jest.fn();
    const wrapper = shallow(<ReusableModal modals={modals} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renders buttons in the reusable modal', () => {
        expect(wrapper.find('#add-update').simulate('click'))
        expect(wrapper.find('#cancel').simulate('click'))
    });

    it('test that modal accepts props', () => {
        const category = {
            category_name: 'category_name'
        }
        const component = shallow(<Categories category_name={category}/>)
        expect(component).toMatchSnapshot();

    })

    

});