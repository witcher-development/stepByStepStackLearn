import { Data, Prop, Template, UpdateTreeI } from './types';

interface ComponentInitData {
  name: string;
  template: Template;
  data?: Data;
  components?: Component[];
}

class Component {
  public name: string;
  private readonly template: Template;
  private data: Data;
  private readonly components: Component[];

  constructor(initData: ComponentInitData) {
    this.name = initData.name;
    this.template = initData.template;
    this.data = initData.data || {};
    this.components = initData.components || [];
  }

  public render(props: Prop[] = []): Template {
    props.forEach(item => {
      const index = this.data.state.findIndex(({ name }) => name === item.name);
      if (index !== -1) {
        this.data.state[index].value = item.value;
      } else {
        this.data.state.push(item);
      }
    });

    let output = this.template;

    for (let i = 0; i < output.length; i++) {
      if (output[i] === '{') {
        for (let j = i; j < output.length; j++) {
          if (output[j] === '}') {
            const templateToCut = output;
            const varName = templateToCut.slice(i + 1, j);

            const temp = output.split('');

            const value = this.data.state.find((prop: Prop) => {
              return prop.name === varName;
            }).value;

            temp.splice(i, j - i + 1);
            temp.splice(i, 0, value);

            output = temp.join('');

            i += value.length;
            break;
          }
        }
      }
      if (this.components.length) {
        if (output[i - 1] === '<' && output[i] === '!') {
          for (let j = i; j < output.length; j++) {
            if (output[j] === '>') {
              const templateToCut = output;
              const componentName = templateToCut.slice(i + 1, j);

              let propsData = [];

              if (this.data.props && this.data.props.length) {
                const propsContainter = this.data.props.find(
                  prop => prop.componentName === componentName
                );

                if (propsContainter) {
                  propsData = propsContainter.props;
                }
              }

              const subTemplate = this.components
                .find(({ name }) => name === componentName)
                .render(propsData);

              const temp = output.split('');

              temp.splice(i - 1, j - i + 2);
              temp.splice(i - 1, 0, subTemplate);

              output = temp.join('');

              i += subTemplate.length;
              break;
            }
          }
        }
      }
    }

    // console.log(output);

    return output;
  }

  public updateTree(data: UpdateTreeI): void {
    if (data.componentName === this.name) {
      this.data = data.newData;
    } else {
      this.components.forEach(component => component.updateTree(data));
    }
  }
}

export { Component };
