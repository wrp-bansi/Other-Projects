// // test/App.test.mjs
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import App from '../src/App';

describe('App Component Test', () => {
  it('renders a greeting message', () => {
    // Arrange
    const wrapper = mount(<App />);

    // Act
    const message = wrapper.find('div').text();

    // Assert
    expect(message).to.equal('Hello, World!');
  });
});
