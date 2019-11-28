interface Prop {
  name: string;
  value: any;
}

class Component {
  public props: Prop[];
  public template: string;

  constructor(props: Prop[], template) {
    this.props = props;
    this.template = template;
  }

  public render() {
    for (let i = 0; i < this.template.length; i++) {
      if (this.template[i] === '{') {
        for (let j = i; j < this.template.length; j++) {
          if (this.template[j] === '}') {
            let templateToCut = this.template;
            const varName = templateToCut.slice(i + 1, j);

            const temp = this.template.split('');

            const value = this.props.find((prop: Prop) => {
              return prop.name === varName;
            }).value;

            temp.splice(i, j - i + 1);
            temp.splice(i, 0, value);

            this.template = temp.join('');

            i += value.length;
            break;
          }
        }
      }
    }

    return this.template;
  }

  protected subComponents: Component[] = [];
}

export { Component };
