[![build status](https://img.shields.io/travis/shuhei/babel-plugin-angular2-type-annotation.svg)](https://travis-ci.org/shuhei/babel-plugin-angular2-type-annotation)
[![npm version](https://img.shields.io/npm/v/babel-plugin-angular2-type-annotation.svg)](https://www.npmjs.org/package/babel-plugin-angular2-type-annotation)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-angular2-type-annotation.svg)](https://www.npmjs.org/package/babel-plugin-angular2-type-annotation)

# [Deprecated] babel-plugin-angular2-type-annotation

**This project has been merged into [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations)**.

An **experimental** babel transformer plugin for Angular 2 type annotation.

## Example

Before:

```js
class HelloComponent {
  constructor(@Parent() foo: Foo, bar: Bar) {
  }
}
```

After:

```js
class HelloComponent {
  constructor(foo: Foo, bar: Bar) {
  }
}
Object.defineProperty(HelloComponent, 'parameters', { get: function () {
  return [[Foo, new Parent()], [Bar]];
}});
```

See [babel-angular2-app](https://github.com/shuhei/babel-angular2-app) for more complete example.
