
import h, { cxs } from '..'
import { update } from 'yo-yo'
import leftPad from 'left-pad'

let _state = {
  blocks: []
}

const store = {
  get state() {
    return _state
  },
  setState: state => {
    _state = {
      ..._state,
      ...state
    }
    store.listeners.forEach(l => l(_state))
  },
  listeners: [],
  subscribe: listener => {
    store.listeners.push(listener)
  }
}


const Block = (block, i) => (
  h`
    <div className=${block}>
      ${i}
    </div>
  `
)

const App = (state) => {
  const bytes = cxs.css.length
  const len = state.blocks.length

  return h`
    <div>
      <pre>${len} blocks</pre>
      <code>${bytes} bytes of CSS</code>
      <pre>ratio ${bytes / len}</pre>
      <pre>${state.duration}ms</pre>
      <br />
      ${state.blocks.map(Block)}
    </div>
  `
}

const randomHex = () => '#' + leftPad(Math.floor(Math.random() * 16777215).toString(16), 6, 0)

const randomNum = () => Math.floor(Math.random() * 32 + 8)

const addBlock = (duration) => {
  const { blocks } = store.state
  const size = randomNum()
  const block = {
    display: 'inline-block',
    margin: 'auto',
    borderRadius: 9999,
    backgroundColor: randomHex(),
    // fontSize: randomNum() / 2,
    width: size,
    height: size
  }

  store.setState({
    duration,
    blocks: [...blocks, block]
  })
}

const tree = App(store.state)

store.subscribe(state => {
  const next = App(state)
  update(tree, next)
})

document.body.appendChild(tree)

let i = 0
let start = Date.now()
const times = []
const int = setInterval(() => {
  const lap = Date.now()
  const dur = lap - start
  times.push(dur)
  addBlock(dur)

  if (i % 64 === 0) {
    // console.log(cxs.css)
    console.log(times)
    console.log('avg', times.reduce((a, b) => a + b, 0) / times.length)
  }
  if (i > 512) {
    clearTimeout(int)
  }
  start = Date.now()
  i++
}, 32)

