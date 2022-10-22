import { style } from '@vanilla-extract/css'

export const logoStyle = style({
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
  fontFamily: 'ui-monospace',
})

export const navStyle = style({
  position: 'relative',
  zIndex: 1,
  padding: '0.8rem 1rem',
  backgroundColor: 'rgb(9, 9, 9)',
  borderBlockEnd: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
})
