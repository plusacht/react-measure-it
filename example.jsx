import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import MeasureIt from './index.jsx'

function getWidth (element) {
  return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().width
}

function getHeight (element) {
  return ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().height
}

class MyComponent extends Component {
  // static propTypes = {
  //   containerWidth: PropTypes.number.isRequired,
  //   containerHeight: PropTypes.number.isRequired
  // }

  render () {
    return (
      <div style={{
        backgroundColor: 'LightBlue',
        width: this.props.containerWidth,
        height: this.props.containerHeight
      }}>
      {`${this.props.containerWidth}px x ${this.props.containerHeight}px`}
			</div>
		)
  }
}

MyComponent.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
}

const EnhancedComponent = MeasureIt({getWidth: getWidth, getHeight: getHeight})(MyComponent)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDOM.render((
  <div style={{
    position: 'absolute',
    top: 20,
    right: 50,
    bottom: 20,
    left: 50
  }}>
    <EnhancedComponent />
  </div>
), div)
