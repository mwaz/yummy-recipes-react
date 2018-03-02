import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ReusableModal from '../components/common/category-edit-add-modal';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('ReusableModal component', () => {
    const modals = jest.fn();
    const wrapper = shallow(<ReusableModal modals={modals} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    

});