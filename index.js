require('./patch');
var babel = require('babel-core');
var t = babel.types;
var Transformer = babel.Transformer;

module.exports = new Transformer('angular2-type-annotation', {
  ClassDeclaration: function ClassDeclaration(node, parent, scope, file) {
    var classRef = node.id;
    var className = classRef.name;
    var classBody = node.body.body;
    var annotations;
    classBody.forEach(function (bodyNode) {
      if (bodyNode.type === 'MethodDefinition' && bodyNode.kind === 'constructor') {
        annotations = ignoreEmpty(parameterAnnotations(bodyNode.value.params));
      }
    });
    if (annotations) {
      var defineProperty = defineAnnotations(annotations, file, classRef);
      if (parent.type === 'ExportNamedDeclaration' || parent.type === 'ExportDefaultDeclaration') {
        this.parentPath.replaceWithMultiple([parent, defineProperty]);
      } else {
        return [node, defineProperty];
      }
    }
  }
});

function parameterAnnotations(params) {
  return params.map(function (param) {
    var annotation = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
    var decorators = param.decorators;
    var item = [];
    if (annotation) {
      if (annotation.type !== 'GenericTypeAnnotation') {
        throw new Error('Type annotation for constructor should be GenericTypeAnnotation: ' + annotation.type);
      }
      // TODO: Support annotation.typeParameters such as List<Foo>
      item.push(t.identifier(annotation.id.name));
    }
    if (decorators) {
      var news = decorators.map(function (decorator) {
        var call = decorator.expression;
        return t.newExpression(call.callee, call.arguments);
      });
      item = item.concat(news);
    }
    return item;
  });
}

function ignoreEmpty(annotations) {
  var allEmpty = annotations.reduce(function (acc, annotation) {
    return acc && annotations.length === 0;
  }, true);
  return allEmpty ? null : annotations;
}

function defineAnnotations(annotations, file, classRef) {
  var types = t.arrayExpression(annotations.map(function (item) {
    return t.arrayExpression(item);
  }));
  return t.expressionStatement(t.callExpression(
    file.addHelper('define-property'),
    [classRef, t.literal('parameters'), types]
  ));
}
