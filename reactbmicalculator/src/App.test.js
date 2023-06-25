import { render, fireEvent, queryByAttribute  } from '@testing-library/react';
import {App, HelloComponentReducer, HelloComponentState} from './App';

const getById = queryByAttribute.bind(null, 'id');

test('renders learn react link', () => {  
  const {getByText} = render(<App />);
  const h1 = getByText(/React/i);
  expect(h1).toHaveTextContent("Hello from React !!")
});

test("verify checkbox",() => {
  const dom = render(<HelloComponentReducer />);
  const checkbox = getById(dom.container, 'checkbox1');
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});
test("verify bmicalculator",() => {
  const dom = render(<HelloComponentState />);
  const height = getById(dom.container, 'height');
  fireEvent.change(height, {target: {value: '161'}});
  const weight = getById(dom.container, 'weight');
  fireEvent.change(weight, {target: {value: '59'}});
  const calculator = getById(dom.container, 'calculate');
  fireEvent.click(calculator);
  const textOutput = getById(dom.container, 'calculatedResponse');
  expect(textOutput).toHaveTextContent("Your BMI 22.76");
});