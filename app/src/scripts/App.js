import { Component } from 'ts-framework';
import { Text } from './Text';
import { Input } from './Input';

const name = 'App';
const template = `<div data-app>
  <h3>App</h3>
  <p>variable in App:</p>
  <p>{text}</p>
  <br>
  child component:
  <br>
  ------- 
  <!Text>
  -------
  <br>
  <button id="button">Change texts!</button>
  <!Input>
</div>`;
const props = [
  {
    componentName: 'Text',
    props: [
      {
        name: 'first_prop',
        value: 'test text',
      },
      {
        name: 'second_prop',
        value: 'important text',
      },
    ],
  },
];
const data = {
  state: [
    {
      name: 'text',
      value: 'text from props',
    },
  ],
  props,
};
const components = [Text, Input];

const initData = {
  name,
  template,
  data,
  components,
};

const App = new Component(initData);

export { App };
