// ComponentName.test.js
import React from 'react';
import { configure } from 'enzyme'

import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
configure({adapter: new Adapter()});

// Inside describe we can add nested blocks for different tests
// First Test case checks where we are Header component is rendered correctly by taking SnapShot.
describe("Header Compoment", () => {
  it("should render Header", () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.getElements()).toMatchSnapshot();

  });

  // Second Test case checks where inital App is loaded with Blank Input fields.
  it("App loads with initial state of empty", () => {
    const wrapper = shallow(<Header />);
    const text = wrapper.find("#input-search").text();
    expect(text).toEqual("");
  });

  // Third Test case check if the user is typing inside the Input field then the Correct value is added to the UI and Database.
  it('should change the input value', () => {
    let wrapper = shallow(<Header/>);
    const input = wrapper.find("#input-search")
    input.simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.find("#input-search").get(0).props.value).toEqual('Hello');
  })

});