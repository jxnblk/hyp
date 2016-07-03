
const { createElement } = require('bel')
const hyperx = require('hyperx')
const cxs = require('cxs').default

cxs.options.autoAttach = true

const createEl = (tag, props, children) => {
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }

  return createElement(tag, props, children)
}

const hyp = hyperx(createEl)

module.exports = hyp
module.exports.cxs = cxs

