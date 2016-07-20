# react-measure-it

[![build status](https://secure.travis-ci.org/plusacht/react-measure-it.png)](http://travis-ci.org/plusacht/react-measure-it)

React higher-order component (HOC) to get dimensions of a container while it resizes


### `MeasureIt([options], [options.getHeight], [options.getWidth])`

Wraps a react component and adds properties `containerHeight` and
`containerWidth`. Useful for responsive design. Properties are update on
window resize or ___the container itself is being resized___.

Can be used as a
[higher-order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.xpzfdia1f).

### Parameters

| parameter             | type     | description                                                                                                                         |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `[options]`           | object   | _optional:_ Options                                                                                                                 |
| `[options.getHeight]` | function | _optional:_ `getHeight(element)` should return element height, where element is the wrapper div. Defaults to `element.clientHeight` |
| `[options.getWidth]`  | function | _optional:_ `getWidth(element)` should return element width, where element is the wrapper div. Defaults to `element.clientWidth`    |


### Example

```js
// ES2015
import React from 'react'
import MeasureIt from 'react-measure-it'

class MyComponent extends React.Component {
  render() (
    <div
      containerWidth={this.props.containerWidth}
      containerHeight={this.props.containerHeight}
    >
    </div>
  )
}

export default MeasureIt()(MyComponent) // Enhanced component
```


```js
// ES2015 - parent Size
import React from 'react'
import MeasureIt from 'react-measure-it'

function getWidth (element) {
  return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().width
}

function getHeight (element) {
  return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().height
}

class MyComponent extends React.Component {
  render() (
    <div
      containerWidth={this.props.containerWidth}
      containerHeight={this.props.containerHeight}
    >
    </div>
  )
}

export default MeasureIt({getWidth: getWidth, getHeight: getHeight})(MyComponent) // Enhanced component
```


**Returns** `function`, Returns a higher-order component that can be used to enhance a react component `MeasureIt()(MyComponent)`


### Credits
* https://www.npmjs.com/package/element-resize-event
* https://www.npmjs.com/package/react-dimensions


### Live Example

Will open a browser window for localhost:9966

`npm i && npm i react react-dom && npm start`

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install react-measure-it
```

## Tests

```sh
$ npm test
```


