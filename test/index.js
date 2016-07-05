
import test from 'ava'
import jsdom from 'jsdom-global'
import h, {
  cxs,
  createElement,
  styleToString,
  parseValue,
  kebab
} from '..'

jsdom('<html><html>')

test.afterEach(() => {
  cxs.clearCache()
})

test('returns a DOM node', t => {
  t.plan(2)
  const node = h`<div>Hello</div>`
  t.is(node.tagName, 'DIV')
  t.regex(node.toString(), /<div>Hello/)
})

test('adds cxs rule from object', t => {
  t.plan(4)
  const cx = {
    color: 'tomato'
  }
  const node = h`<div className=${cx}></div>`
  t.regex(node.toString(), /class="cxs/)
  t.is(typeof cxs.css, 'string')
  t.regex(cxs.css, /tomato/)
  t.truthy(cxs.css.length)
})

test('ignores string classNames', t => {
  h`<div className='hello'></div>`
  t.falsy(cxs.css.length)
})

test('attaches stylesheet', async t => {
  t.plan(1)
  const getTag = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tag = document.getElementById('cxs-style')
        resolve(tag)
      }, 200)
    })
  }
  t.truthy(await getTag())
})

test('converts style object to string', t => {
  const str = styleToString({ color: 'tomato' })
  t.is(typeof str, 'string')
})

test('converts numbers to px for relevant properties', t => {
  t.plan(2)
  const pxValue = parseValue('margin', 16)
  const nValue = parseValue('lineHeight', 1.5)
  t.true(pxValue === '16px')
  t.true(nValue === 1.5)
})

test('converts camelCase to kebab-case', t => {
  const str = kebab('helloHyp')
  t.true(str === 'hello-hyp')
})

test('creates a DOM element', t => {
  const node = createElement('div', {})
  t.is(node.tagName, 'DIV')
})

