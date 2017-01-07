
import h, { cxs } from '..'
import { update } from 'yo-yo'
import Color from 'color'
import readme from '../README.md'
import pkg from '../package.json'

const createStore = (reducer, listener = () => {}) => {
  let _ = reducer(undefined, {})
  return {
    get state () { return _ },
    dispatch: (a) => {
      _ = reducer(_, a)
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

// const darken = (v, d) => Color(v).darken(d).rgb().string()
const alpha = (v, a) => Color(v).alpha(a).rgb().string()

const green = '#0fa'
const blue = '#0cf'
const purple = '#f0c'
const orange = '#fa0'

const colors = [
  green,
  blue,
  purple,
  orange
]

const Button = ({ text, css, ...props }) => {
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
    ...css,
    ':hover': {
      boxShadow: `inset 0 0 0 999px ${alpha('#000', 1 / 8)}`
    }
  }

  return h`
    <button css=${cx} ${props}>
      ${text}
    </button>
  `
}

const TweetButton = ({ text, via = 'jxnblk' }) => {
  const cx = {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: 20,
    'iframe': {
      height: 20,
      margin: 0
    }
  }

  const root = h`
    <div css=${cx}>
      <a href='https://twitter.com/share'
        class='twitter-share-button'
        data-url='http://jxnblk.com/react-cxs/'
        data-text=${text}
        data-via=${via}>
        Tweet
      </a>
    </div>
  `

  if (typeof twttr !== 'undefined') {
    twttr.ready(() => {
      twttr.widgets.load(root)
    })
  }

  return root
}

const Readme = () => {
  const div = document.createElement('div')
  div.innerHTML = readme

  const cx = {
    fontSize: 14,
    padding: 32,
    maxWidth: 640,
    margin: 'auto',
    'h1': {
      marginTop: 32,
      marginBottom: 8,
      fontWeight: 500
    },
    'h2': {
      marginTop: 32,
      marginBottom: 8,
      fontWeight: 500
    },
    'p': {
      marginTop: 0,
      marginBottom: 32
    }
  }

  return h`
    <div css=${cx}>
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

const HtmlExample = () => {
  const buttonHtml = Button({ text: 'Hello' }).outerHTML
  const cx = {
    fontSize: 14,
    padding: 32,
    maxWidth: 640,
    margin: 'auto'
  }

  return h`
    <div css=${cx}>
      <h3>Example HTML output</h3>
      <pre>${buttonHtml}</pre>
    </div>
  `
}

const Css = () => {
  const css = prettifyCss(cxs.getCss())

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
    <div css=${cx.root}>
      <h3>Generated CSS for this page</h3>
      <pre css=${cx.pre}>/* ${cxs.css.length} bytes */
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
      // color,
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
        fontSize: 96
      }
    },
    ctas: {
      display: 'flex',
      alignItems: 'center'
    },
    link: {
      fontSize: 14,
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: 4,
      marginRight: 16,
      borderRadius: 3,
      color: '#222',
      backgroundColor: 'var(--primary)',
      textDecoration: 'none',
      ':hover': {
        backgroundColor: 'white'
      }
    },
    buttons: {
      display: 'flex'
    },
    button: {
      fontSize: 32,
      flex: '1 1 auto',
      color: '#222'
    }
  }

  const sx = {
    header: {
      color
    },
    button: {
      backgroundColor: color
    }
  }

  return h`
    <div css=${cx.root}>
      <header css=${cx.header} style=${sx.header}>
        <h1 css=${cx.heading}>
          ϟ hyp ${count} ${color}
        </h1>
        <p>${pkg.description}</p>
        <div css=${cx.ctas}>
          <a href='https://github.com/jxnblk/hyp'
            css=${cx.link}>
            GitHub
          </a>
          ${TweetButton({
            text: `Hyp: ${pkg.description}`
          })}
        </div>
      </header>
      <div css=${cx.buttons}>
        ${Button({
          text: '-',
          css: cx.button,
          style: sx.button,
          onclick: e => dispatch({ type: DECREMENT })
        })}
        ${Button({
          text: '+',
          css: cx.button,
          style: sx.button,
          onclick: e => dispatch({ type: INCREMENT })
        })}
      </div>
      ${Readme()}
      ${HtmlExample()}
      ${Css()}
    </div>
  `
}

const app = createApp(reducer, App)

app.mount(document.body)

