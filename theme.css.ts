import { createGlobalTheme } from '@vanilla-extract/css'

export default createGlobalTheme(':root', {
  fonts: {
    mono: 'ui-monospace, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
  },
  space: {
    small: '0.8rem',
    regular: '1.8rem',
  },
  colors: {
    background: 'rgb(18, 18, 18)',
    foreground: 'rgb(9, 9, 9)',
  },
})
