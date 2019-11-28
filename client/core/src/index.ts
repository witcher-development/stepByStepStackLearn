import { Component } from './lib/component';

class Root {
  protected rootElement: HTMLElement | null;
  protected rootComponent: Component | null;

  public init(element: HTMLElement | null, component: Component) {
    this.rootElement = element;
    this.rootComponent = component;

    this.rootElement.innerHTML = this.rootComponent.render();
  }
}

export { Root, Component }

// const element = null;

// const props = [
//   {
//     name: 'text',
//     value: 'text from props'
//   },
//   {
//     name: 'word',
//     value: 'word from props'
//   }
// ];
// const template = '<div><p>{text}</p>new<p>{word}</p><div>';
// const component = new Component(props, template);


// const app = new Root();
// app.init(element, component);