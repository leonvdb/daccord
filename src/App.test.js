import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import validateEmail from './utilities/validateEmail'
import { createJsonWebToken } from './server/utilities/createJsonWebToken'
import { createRefId, generateToken } from './server/utilities/cryptoGenerators'

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Fake Test', () => {
  expect(true).toBeTruthy();
})

test('invalidate email', () => {
  expect(validateEmail("John@example")).toBe(false)
})

test('validate email', () => {
  expect(validateEmail("John@example.com")).toBe(true)
})

test('createJsonWebToken', () => {
  const jwt = createJsonWebToken('5c86449221c3a8591d76b1a4', 'ADMIN', false)
  expect(jwt).toContain('Bearer')
})


//this doesnt make much sense from here on... just for reference

test('createRefId', () => {
  const refId = createRefId();
  expect(refId).toBeTruthy()
})

jest.mock('./server/utilities/cryptoGenerators', () => ({
  createRefId: () => 'xD',
  generateToken: () => 'hmmm'
}))

test('generateToken', () => {
  expect(generateToken()).toBeTruthy()
})