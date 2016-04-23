import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function defaultGetWidth (element) {
  return ReactDOM.findDOMNode(element).getBoundingClientRect().width
}

function defaultGetHeight (element) {
  return ReactDOM.findDOMNode(element).getBoundingClientRect().height
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window and "container that it sits in resize".
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 *
 * @param {object} [options] Options
 * @param {function} [options.getHeight] `getHeight(element)` should return element
 * height, where element is the wrapper div. Defaults to `element.clientHeight`
 * @param {function} [options.getWidth]  `getWidth(element)` should return element
 * width, where element is the wrapper div. Defaults to `element.clientWidth`
 * @return {function}                   Returns a higher-order component that can be
 * used to enhance a react component `MeasureIt()(MyComponent)`
 *
 * ### Motivation
 * Motivation to do this project was that all other dimension calculator would
 * not work in highly dynamic nested components.
 *
 * ### Credits
 * * https://www.npmjs.com/package/element-resize-event
 * * https://www.npmjs.com/package/react-dimensions
 *
 *
 * ### Live Example
 *
 * Will open a browser window for localhost:9966
 *
 * `npm i && npm i react react-dom && npm start`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import MeasureIt from 'react-measure-it'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default MeasureIt()(MyComponent) // Enhanced component
 *
 * @example
 * // ES2015 - parent Size
 * import React from 'react'
 * import MeasureIt from 'react-measure-it'
 *
 * function getWidth (element) {
 *   return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().width
 * }
 *
 * function getHeight (element) {
 *   return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().height
 * }
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default MeasureIt({getWidth: getWidth, getHeight: getHeight})(MyComponent) // Enhanced component
 *
 */
export default function MeasureIt ({ getWidth = defaultGetWidth, getHeight = defaultGetHeight } = {}) {
  return (DecoratedComponent) => {
    return class MeasureItHOC extends Component {

      constructor () {
        super(...arguments)
        this.state = {
          containerWidth: 0,
          containerHeight: 0
        }
      }

      componentDidMount () {
        this.refs.resizeSensor.contentDocument.defaultView.addEventListener('resize', this.resizeListener.bind(this))

        this.setState({
          containerWidth: getWidth(this),
          containerHeight: getHeight(this)
        })
      }

      componentWillUnmount () {
        this.refs.resizeSensor.contentDocument.defaultView.removeEventListener('resize', this.resizeListener.bind(this))
      }

      getWindow () {
        return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window
      }

      requestFrame (fn) {
        var window = this.getWindow()
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
          return window.setTimeout(fn, 20)
        }
        return raf(fn)
      }

      cancelFrame (id) {
        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
          window.clearTimeout
        return cancel(id)
      }

      resizeListener (e) {
        if (this._animationFrame) {
          this.cancelFrame(this._animationFrame)
        }
        this._animationFrame = this.requestFrame(() => {
          this.onResize()
        })
      }

      onResize () {
        this.setState({
          containerWidth: getWidth(this),
          containerHeight: getHeight(this)
        })
      }

      render () {
        return (
          <div>
          {(this.state.containerWidth || this.state.containerHeight) &&
              <DecoratedComponent {...this.props} {...this.state}/>}

            <object
              ref='resizeSensor'
              data='about:blank'
              className='resize-sensor'
              style={{display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: -1}}
              />
          </div>
        )
      }
    }
  }
}
