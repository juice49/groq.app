import { globalStyle } from '@vanilla-extract/css'
import theme from './theme.css'

globalStyle('*', {
  margin: 0,
  padding: 0,
})

globalStyle(':root', {
  backgroundColor: theme.colors.background,
  fontFamily: theme.fonts.mono,
  fontSize: 'clamp(1em, calc(1em + 0.28vw), 3.4em)',
})

globalStyle('.cm-content, .cm-scroller', {
  padding: '0 !important',
})
