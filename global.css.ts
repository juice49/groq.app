import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  margin: 0,
  padding: 0,
})

globalStyle(':root', {
  backgroundColor: 'rgb(18, 18, 18)',
  fontFamily: 'system-ui',
})
