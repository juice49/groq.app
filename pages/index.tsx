import { Suspense, useState, useEffect } from 'react'
import { suspend } from 'suspend-react'
import Editor from '@monaco-editor/react'
import '../lib/wasm-exec'
import loadGroqfmt from '../lib/load-groqfmt'

import {
  SandpackProvider,
  SandpackThemeProvider,
  CodeEditorProps,
  useSandpack,
  useActiveCode,
} from '@codesandbox/sandpack-react'

const Page: React.FC = () => {
  return (
    <>
      <h1>groq.app</h1>
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
        <SandpackThemeProvider>
          <Suspense fallback={<p>groqfmt is loading&hellip;</p>}>
            <CodeEditor showTabs={false} showLineNumbers />
          </Suspense>
        </SandpackThemeProvider>
      </SandpackProvider>
    </>
  )
}

export default Page

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [error, setError] = useState<GroqfmtError>()
  const { sandpack } = useSandpack()
  const { code, updateCode } = useActiveCode()
  const groqfmt = suspend(loadGroqfmt, ['groqfmt'])

  return (
    <>
      <Editor
        width='100%'
        height='50vh'
        language='groq'
        theme='vs-dark'
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={value => updateCode(value || '')}
      />
      <button
        type='button'
        onClick={() => {
          if (groqfmt) {
            const { result, error } = groqfmt(code)

            if (error) {
              setError(error)
              return
            }

            setError(undefined)
            updateCode(result)
          }
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
    </>
  )
}
