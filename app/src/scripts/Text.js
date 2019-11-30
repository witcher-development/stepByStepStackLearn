import { Component } from 'ts-framework';

const name = 'Text';
const template = `<div data-text>
  <h3>Text</h3>
  <p>variable from Text:</p>
  <p>{word}</p>
  <p>props in Text:</p>
  <p>{second_prop}</p>
 </div>`;
const data = {
  state: [
    {
      name: 'text',
      value: 'text from subcomp',
    },
    {
      name: 'word',
      value: 'word from props',
    },
  ],
};

const initData = {
  name,
  template,
  data,
};

const Text = new Component(initData);

export { Text };
