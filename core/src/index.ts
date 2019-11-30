import { Component } from './lib/component';
import { UpdateTreeI } from './lib/types';

class Root {
  protected rootElement: Element | null;
  protected rootComponent: Component | null;

  public init(element: Element, component: Component): void {
    this.rootElement = element;
    this.rootComponent = component;

    this.rootElement.innerHTML = this.rootComponent.render();
  }

  public updateTree(data: UpdateTreeI): void {
    this.rootComponent.updateTree(data);

    const temp = this.rootComponent.render();
    // console.log(temp);
    this.rootElement.innerHTML = temp;
  }
}

export { Root, Component };
