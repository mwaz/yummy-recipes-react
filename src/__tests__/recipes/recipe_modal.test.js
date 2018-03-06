import React from 'react';
import { shallow, mount, render } from 'enzyme';
import RecipeModal from '../../components/common/recipe-modal';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('RecipeModal component', () => {
    const recipes= jest.fn();
    const wrapper = shallow(<RecipeModal recipes={recipes} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});