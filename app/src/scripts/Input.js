import { Component } from 'ts-framework';

const name = 'Input';
const template = `<div data-input>
  <h3>Input</h3>
  <p>{input}</p>
  <input type="text" id="input" placeholder="{input}">
  <button id="for-input">Change text!</button>
 </div>`;
const data = {
  state: [
    {
      name: 'input',
      value: 'placeholder',
    },
  ],
};

const initData = {
  name,
  template,
  data,
};

const Input = new Component(initData);

export { Input };
