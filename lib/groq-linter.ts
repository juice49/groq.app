import { linter } from '@codemirror/lint'

/**
 * Experimental GROQ linter for Codemirror.
 *
 * Note: The go-groq parser only returns one error at a time.
 */
const groqLinter = linter(view => {
  const code = view.state.doc.toString()

  // TODO: Should not rely on global groqfmt.
  const { error } = groqfmt(code)

  if (!error) {
    return []
  }

  return [
    {
      from: error.begin,
      to: error.end ?? error.begin,
      severity: 'error',
      message: error.message,
    },
  ]
})

export default groqLinter
