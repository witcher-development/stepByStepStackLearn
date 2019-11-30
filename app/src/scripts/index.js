import { Root } from 'ts-framework';
import { App } from './App';

const element = document.querySelector('#root');

const root = new Root();
root.init(element, App);

document.addEventListener('click', e => {
  if (e.target.id === 'button') {
    const props = [
      {
        componentName: 'Text',
        props: [
          {
            name: 'second_prop',
            value: 'important text2',
          },
        ],
      },
    ];
    const data = {
      state: [
        {
          name: 'text',
          value: 'it is new text!!',
        },
      ],
      props,
    };

    root.updateTree({
      componentName: 'App',
      newData: data,
    })
  }
  if (e.target.id === 'for-input') {
    const text = document.getElementById('input').value;
    const data = {
      state: [
        {
          name: 'input',
          value: text,
        },
      ],
    };

    root.updateTree({
      componentName: 'Input',
      newData: data,
    })
  }
});
