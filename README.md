
# ⚡︎ hyp

[![Build Status](https://travis-ci.org/jxnblk/hyp.svg?branch=master)](https://travis-ci.org/jxnblk/hyp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**WIP** Functional UI component microlibrary with ES6 tagged template literal

```sh
npm i hyp
```

```js
// Example component
import h from 'hyp'

const Button = ({
  text,
  ...props
}) => {
  const cx = {
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin:0,
    padding: 8,
    border: 0,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'black',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    ':hover': {
      backgroundColor: '#07c'
    }
  }

  return h`
    <button className=${className} ${props}>
      ${text}
    </button>
  `
}

export default Button
```

## About

hyp is a wrapper around the [bel](https://github.com/shama/bel)
library that adds support for CSS-in-JS using [cxs](https://github.com/jxnblk/cxs),
which handles pseudoclasses and media queries in functional UI components.


## Related libraries

- [bel](https://github.com/shama/bel)
- [yo-yo](https://github.com/maxogden/yo-yo)
- [choo](https://github.com/yoshuawuyts/choo)
- [cxs](https://github.com/jxnblk/cxs)

MIT License
