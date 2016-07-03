
const { createElement } = require('bel')
const hyperx = require('hyperx')
const addPx = require('add-px-to-style')
const cxs = require('cxs').default

cxs.options.autoAttach = true

const createEl = (tag, props, children) => {
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }

  if (props.style && typeof props.style === 'object') {
    props.style = styleToString(props.style)
  }

  return createElement(tag, props, children)
}

const hyp = hyperx(createEl)

const styleToString = (style) => {
  return Object.keys(style)
    .map(key => `${kebab(key)}:${parseValue(key, style[key])}`)
    .join(';')
}
const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val
const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

module.exports = hyp
module.exports.cxs = cxs

