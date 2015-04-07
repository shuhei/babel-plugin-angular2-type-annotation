[![npm version](https://img.shields.io/npm/v/babel-plugin-angular2-type-annotation.svg)](https://www.npmjs.org/package/babel-plugin-angular2-type-annotation)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-angular2-type-annotation.svg)](https://www.npmjs.org/package/babel-plugin-angular2-type-annotation)

# babel-plugin-angular2-type-annotation

An **experimental** babel transformer plugin for Angular 2 type annotation.

## Example

Before:

```js
class HelloComponent {
  constructor(foo: Foo, bar: Bar) {
  }
}
```

After:

```js
class HelloComponent {
  constructor(foo: Foo, bar: Bar) {
  }
}
HelloComponent.parameters = [[Foo], [Bar]];
```
