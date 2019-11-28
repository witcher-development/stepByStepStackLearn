import { Component } from './lib/component';

// class Root {
//   protected readonly rootElement: HTMLElement | null;
//   protected readonly rootComponent: Component | null;
//
//   public init(element: HTMLElement, component: Component) {
//     this.rootElement = element;
//     this.rootComponent = component;
//   };
// }

function Root() {
  let rootElement;

  this.init = (element: string) => {
    rootElement = element;
  };

  const getRootElement = () => {
    return rootElement;
  };
};

const app = new Root();
app.init('root test');

setTimeout(() => {
  console.log(app.getRootElement());
}, 1000);
