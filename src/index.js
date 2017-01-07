
import { createElement } from 'bel'
import classnames from 'classnames'
import hyperx from 'hyperx'
import addPx from 'add-px-to-style'
import cxs from 'cxs'

const createEl = (tag, props, children) => {
  if (props.css && typeof props.css === 'object') {
    props.className = classnames(props.className, cxs(props.css))
  }

  if (props.style && typeof props.style === 'object') {
    props.style = styleToString(props.style)
  }

  return createElement(tag, props, children)
}

const hyp = hyperx(createEl)

const styleToString = (style) => {
  return Object.keys(style)
    .filter(key => style[key] !== null)
    .map(key => `${kebab(key)}:${parseValue(key, style[key])}`)
    .join(';')
}

const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val
const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

module.exports = hyp
module.exports.cxs = cxs
module.exports.createElement = createEl
module.exports.styleToString = styleToString
module.exports.parseValue = parseValue
module.exports.kebab = kebab

