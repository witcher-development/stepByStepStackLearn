import { Root, Component } from 'ts-framework';

const element = document.querySelector('#root');

const props = [
  {
    name: 'text',
    value: 'text from props',
  },
  {
    name: 'word',
    value: 'word from props',
  },
];
const template = '<div><p>{text}</p>new<p>{word}</p><div>';
const component = new Component(props, template);

const app = new Root();
app.init(element, component);