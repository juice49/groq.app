import { Suspense, useState } from 'react'
import '../lib/wasm-exec'

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

const CodeEditor: React.FC<CodeEditorProps> = props => {
  const [error, setError] = useState<GroqfmtError>()
  const { code, updateCode } = useActiveCode()
  const groqfmt = groqfmtResource.read()

  return (
    <>
      <SandpackCodeEditor {...props} />
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

const wrapPromise = promise => {
  let status = 'pending'
  let result
  let suspend = promise().then(
    res => {
      status = 'success'
      result = res
    },
    err => {
      status = 'error'
      result = err
    },
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspend
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    },
  }
}

const groqfmtResource = wrapPromise(
  async (): Promise<(query: string) => GroqfmtResult> => {
    if (typeof window === 'undefined') {
      return
    }

    const go = new Go()

    const { instance } = await WebAssembly.instantiateStreaming(
      fetch('/groqfmt-1666211465073.wasm'),
      go.importObject,
    )

    go.run(instance)
    return groqfmt
  },
)
