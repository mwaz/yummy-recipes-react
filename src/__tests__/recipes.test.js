import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Recipes from '../components/recipes-front/recipes';
import toJson, { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom'; 

describe('Recipes component', () => {
    const recipes = jest.fn();
    const wrapper = shallow( <Recipes recipes={recipes} location={{}} match={{ params: { id: 1 } }}/>
    );
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});