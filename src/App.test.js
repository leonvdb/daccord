import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import validateEmail from './utilities/validateEmail'
import { createJsonWebToken } from './server/utilities/createJsonWebToken'
import * as cryptoGenerators from './server/utilities/cryptoGenerators'

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

test('createRefId', () => {
  const refId = cryptoGenerators.createRefId();
  expect(refId).toBeTruthy()
})

test('generateToken', () => {
  //TODO: consider replacing this with rewiremock or babel-plugin-rewire
  const createRefId = jest.spyOn(cryptoGenerators, 'createRefId');
  createRefId.mockReturnValue('mockRef')
  const token = cryptoGenerators.generateToken()
  expect(createRefId).toHaveBeenCalledTimes(3)
  expect(token).toBe('mockRefmockRefmockRef')
  createRefId.mockRestore();
})