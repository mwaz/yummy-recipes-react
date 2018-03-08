import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import RecipeModal from '../../components/common/recipeModal';


describe('RecipeModal component', () => {
  const recipes = jest.fn();
  const wrapper = shallow(<RecipeModal recipes={recipes} location={{}} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
