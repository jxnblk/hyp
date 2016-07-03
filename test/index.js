
import test from 'ava'
import jsdom from 'jsdom-global'
import h, { cxs } from '..'

jsdom('<html><html>')

test.afterEach(() => {
  cxs.clearCache()
})

test('returns a DOM node', t => {
  const node = h`<div>Hello</div>`
  t.is(node.tagName, 'DIV')
})

test('adds cxs rule from object', t => {
  t.plan(3)
  const cx = {
    color: 'tomato'
  }
  h`<div className=${cx}></div>`
  t.is(typeof cxs.css, 'string')
  t.regex(cxs.css, /tomato/)
  t.truthy(cxs.css.length)
})

test('ignores string classNames', t => {
  h`<div className='hello'></div>`
  t.falsy(cxs.css.length)
})

test('attaches stylesheet', t => {
  t.plan(2)
  const style = document.getElementById('cxs')
  t.truthy(style)
  t.truthy(style.sheet.cssRules.length)
})

