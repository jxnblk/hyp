
import h, { cxs } from '..'
import { update } from 'yo-yo'
import Color from 'color'
import readme from '../README.md'
import pkg from '../package.json'

const createStore = (reducer, listener = () => {}) => {
  let _ = reducer(undefined, {})
  return {
    get state(){ return _ },
    dispatch: (a) => {
      _ = reducer(_,a)
      listener()
    }
  }
}

const createApp = (reducer, renderer) => {
  const render = () => {
    const next = renderer(store)
    update(app, next)
  }

  const store = createStore(reducer, render)
  const app = renderer(store)

  app.mount = (el) => {
    el.appendChild(app)
  }

  app.store = store

  return app
}

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const reducer = (state = {
  count: 0
}, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case DECREMENT:
      if (state.count < 1) {
        return state
      }
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

const darken = (v, d) => Color(v).darken(d).rgbString()
const alpha = (v, a) => Color(v).alpha(a).rgbString()

const green = '#0fa'
const blue = '#0cf'
const purple = '#f0c'
const orange = '#fa0'

const colors = [
  green,
  blue,
  purple,
  orange,
]

const Button = ({ text, className, ...props }) => {
  const cx = {
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 500,
    textAlign: 'center',
    margin: 0,
    padding: 8,
    border: 0,
    borderRadius: 0,
    color: 'white',
    textDecoration: 'none',
    backgroundColor: 'black',
    cursor: 'pointer',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    ...className,
    ':hover': {
      boxShadow: `inset 0 0 0 999px ${alpha('#000', 1/8)}`
    }
  }

  return h`
    <button className=${cx} ${props}>
      ${text}
    </button>
  `
}

const Readme = () => {
  const div = document.createElement('div')
  div.innerHTML = readme

  const cx = {
    fontSize: 14,
    padding: 32,
    maxWidth: 640,
    margin: 'auto'
  }

  return h`
    <div className=${cx}>
      ${div}
    </div>
  `
}

const prettifyCss = (css) => {
  return css
    .replace(/;/g, ';\n  ')
    .replace(/{/g, ' {\n  ')
    .replace(/}/g, '}\n')
}

const Css = () => {
  const css = prettifyCss(cxs.css)

  const cx = {
    root: {
      padding: 32,
      maxWidth: 640,
      margin: 'auto'
    },
    pre: {
    }
  }

  return h`
    <div className=${cx.root}>
      <h3>Generated CSS</h3>
      <pre className=${cx.pre}>/* ${cxs.css.length} bytes */
${css}</pre>
    </div>
  `
}

const App = ({ state, dispatch }) => {
  const { count } = state
  const color = colors[count % colors.length]

  const cx = {
    root: {
      fontFamily: 'SF Mono, Roboto Mono, Menlo, monospace',
      fontWeight: 500,
      lineHeight: 1.5,
      '--primary': color
    },
    header: {
      padding: 48,
      color,
      backgroundColor: '#222',
      '@media (min-width:52em)': {
        padding: 96
      }
    },
    heading: {
      fontSize: 48,
      lineHeight: 1,
      fontWeight: 500,
      margin: 0,
      '@media (min-width:52em)': {
        fontSize: 96,
      }
    },
    link: {
      color: 'inherit',
    },
    buttons: {
      display: 'flex'
    },
    button: {
      fontSize: 32,
      flex: '1 1 auto',
      color: '#222',
      backgroundColor: color
    }
  }

  return h`
    <div className=${cx.root}>
      <header className=${cx.header}>
        <h1 className=${cx.heading}>hyp ${count} ${color}</h1>
        <p>${pkg.description}</p>
        <a href='https://github.com/jxnblk/hyp'
          className=${cx.link}>
          GitHub
        </a>
      </header>
      <div className=${cx.buttons}>
        ${Button({
          text: '-',
          className: cx.button,
          onclick: e => dispatch({ type: DECREMENT })
        })}
        ${Button({
          text: '+',
          className: cx.button,
          onclick: e => dispatch({ type: INCREMENT })
        })}
      </div>
      ${Readme()}
      ${Css()}
    </div>
  `
}

const app = createApp(reducer, App)

app.mount(document.body)

