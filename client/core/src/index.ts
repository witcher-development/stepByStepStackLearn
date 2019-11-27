export * from './lib/number';
import { Component } from './lib/component';

const input: Component = {
  test: 'test2'
};

const func = (input1: Component): Component => {
  return input1;
};

console.log(func(input));
