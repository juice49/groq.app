import { SandpackThemeProp } from '@codesandbox/sandpack-react'
import theme from './theme.css'

const sandpackTheme: SandpackThemeProp = {
  colors: {
    surface1: theme.colors.background,
    surface3: theme.colors.foreground,
  },
  font: {
    size: '1rem',
    lineHeight: '1.9',
    mono: theme.fonts.mono,
  },
}

export default sandpackTheme
