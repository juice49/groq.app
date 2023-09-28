import { Suspense, useState } from 'react'
import { suspend } from 'suspend-react'
import { EditorView } from '@codemirror/view'
import { type GroqfmtError, format } from '@groqfmt/wasm'
import '../theme.css'
import '../global.css'
import { logo, nav, container, containerInner } from '../index.css'
import '@groqfmt/wasm/dist/wasm-exec'
import loadGroqfmt from '../lib/load-groqfmt'
import groqLinter from '../lib/groq-linter'
import sandpackTheme from '../sandpack-theme'

import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackCodeEditor,
  CodeEditorProps,
  useActiveCode,
} from '@codesandbox/sandpack-react'

const Page: React.FC = () => {
  return (
    <>
      <div className={nav}>
        <h1 className={logo}>groq.app</h1>
      </div>
      <SandpackProvider
        template='vanilla-ts'
        files={{
          '/index.groq': {
            code: `*[_type ==   "author" &&
name == "Harper" ] {
    _id,
 'bookCount' : count(books)
}`,
          },
        }}
        options={{
          activeFile: '/index.groq',
        }}
      >
        <SandpackThemeProvider theme={sandpackTheme}>
          <Suspense fallback={<p>groqfmt is loading&hellip;</p>}>
            <CodeEditor showTabs={false} />
          </Suspense>
        </SandpackThemeProvider>
      </SandpackProvider>
    </>
  )
}

export default Page

const CodeEditor: React.FC<CodeEditorProps> = props => {
  const [error, setError] = useState<GroqfmtError>()
  const [params, setParams] = useState<Record<string, string>>()
  const { code, updateCode } = useActiveCode()
  const groqfmt = suspend(loadGroqfmt, ['groqfmt'])

  return (
    <main className={container}>
      <div className={containerInner}>
        <SandpackCodeEditor
          {...props}
          extensions={[groqLinter, EditorView.theme({}, { dark: true })]}
        />
        <button
          type='button'
          onClick={() => {
            if (!groqfmt) {
              return
            }

            const result = format({
              input: code,
              groqfmt,
            })

            setParams(result.inputMode === 'url' ? result.params : undefined)

            if (result.error) {
              setError(result.error)
              return
            }

            setError(undefined)
            updateCode(result.result)
          }}
        >
          Format
        </button>
        {error && (
          <section>
            <h2>Error</h2>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </section>
        )}
        {params && (
          <section>
            <h2>Params</h2>
            <pre>{JSON.stringify(params, null, 2)}</pre>
          </section>
        )}
      </div>
    </main>
  )
}
