import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BreadCrumbComponent from '../../components/common/breadcrumb';
import toJson, { shallowToJson } from 'enzyme-to-json';

describe('BreadCrumbComponent component', () => {
    const breadcrumb= jest.fn();
    const wrapper = shallow(<BreadCrumbComponent breadcrumb={breadcrumb} location={{}} />);
    const preventDefault = jest.fn();

    it('renders properly without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});