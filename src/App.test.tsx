import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders the component', () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='component']");
  expect(appComponent.length).toBe(2);
});
