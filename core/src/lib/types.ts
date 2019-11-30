interface Prop {
  name: string;
  value: any;
}

interface PropsContainer {
  componentName: string;
  props: Prop[];
}

interface Data {
  state?: Prop[];
  props?: PropsContainer[];
}

type Template = string;

interface UpdateTreeI {
  componentName: string;
  newData: Data;
}

export { Prop, PropsContainer, Data, Template, UpdateTreeI };
