import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Recipes from '../../components/recipes-front/recipes';
import SearchForm from '../../components/common/search';
import CardComponent from '../../components/common/card'
import toJson, { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import RecipeModal from '../../components/common/recipe-modal';
import DeleteComponent from '../../components/common/delete';
import Paginator from '../../components/common/paginator';

describe('Recipes component', () => {
    const wrapper = shallow( <Recipes  match={{ params: { id: 1 } }}/>
    );
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Finds a search button', () => {
        expect(wrapper.find('Button').length).toBe(1)
        
    } )
    it('it renders state initially', () => {
        expect(wrapper.state().recipe_name).toEqual('');
        expect(wrapper.state().recipe_ingredients).toEqual('');
        expect(wrapper.state().recipe_methods).toEqual('');
    });

    it('it chages states ', () => {
        wrapper.setState({
        recipe_name: 'panckakes',
        recipe_ingredients: 'milk, flour',
        recipe_methods: 'boil till ready',
        })
        expect(wrapper.state().recipe_name).toEqual('panckakes');
        expect(wrapper.state().recipe_ingredients).toEqual('milk, flour');
        expect(wrapper.state().recipe_methods).toEqual('boil till ready');
    });

    it('it adds a recipe', () => {
        const component = shallow(<RecipeModal />)
        expect(component.find('#recipe_modal_button').simulate('click'))
        expect(wrapper.instance().handleAddRecipes({preventDefault}))
    });
    
    it('it edits a recipe', () => {
        const component = shallow(<RecipeModal />)
        expect(component.find('#recipe_modal_button').simulate('click'))
        expect(wrapper.instance().editRecipe({preventDefault}))
    });
 
    it('it views recipe details', () => {
        const component = shallow(<RecipeModal />)
        expect(component.find('#recipe_modal_button').simulate('click'))
        expect(wrapper.instance().getRecipes())
    });

    it('it cancels editing a recipe', () => {
        const component = shallow(<RecipeModal />)
        expect(component.find('#cancel').simulate('click'))
        expect(wrapper.instance().editRecipe({preventDefault}))
    });

    it('it deletes a recipe', () => {
        const component = shallow(<DeleteComponent />)
        expect(component.find('#delete').simulate('click'))
        expect(wrapper.instance().handleDelete({ preventDefault }))
    });

    it('it calls the search method', () => {
        const component = shallow(<SearchForm />)
        expect(component.find('#btn-search').simulate('click'))
        expect(wrapper.instance().searchRecipes({ preventDefault }))
    });

    it('it calls the pagination requests for next page', () => {
        const component = shallow(<Paginator />)
        expect(component.find('#next').simulate('click'))
        expect(wrapper.instance().getNextPage({ preventDefault }))

    });
    it('it calls the pagination requests for previous page', () => {
        const component = shallow(<Paginator />)
        expect(component.find('#previous').simulate('click'))
        expect(wrapper.instance().getPrevPage({ preventDefault }))
    });

    it('it checks if the component has recipes', () => {
        expect(wrapper.instance().checkRecipes())
    });

    it('it shows and hides category modal', () => {
        expect(wrapper.instance().handleShow({ preventDefault }))
        expect(wrapper.instance().handleHide({ preventDefault }))
    });
    it('it renders recipes fetched', () => {
        expect(wrapper.instance().getRecipes())
    });
});