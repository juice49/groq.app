import { style } from '@vanilla-extract/css'
import theme from './theme.css'

export const logo = style({
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
})

export const nav = style({
  position: 'relative',
  zIndex: 1,
  padding: `${theme.space.small} ${theme.space.regular}`,
  backgroundColor: theme.colors.foreground,
  borderBlockEnd: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
})

export const container = style({
  display: 'grid',
  paddingBlock: theme.space.regular,
  gridTemplateColumns: `1fr min(70ch, 100% - (${theme.space.regular} * 2)) 1fr`,
})

export const containerInner = style({
  gridColumn: 2,
})
