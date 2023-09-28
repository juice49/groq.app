import { type Groqfmt } from '@groqfmt/wasm'

// TODO: This can probably be a generic `loadGoLang` function.
export default async function loadGroqfmt(): Promise<Groqfmt | undefined> {
  if (typeof window === 'undefined') {
    return
  }

  const go = new Go()

  const { instance } = await WebAssembly.instantiateStreaming(
    fetch(`/${process.env.NEXT_PUBLIC_GROQFMT_BINARY}`),
    go.importObject,
  )

  go.run(instance)
  return groqfmt
}
