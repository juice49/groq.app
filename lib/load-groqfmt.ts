import { type Groqfmt } from '@groqfmt/wasm'

// TODO: This can probably be a generic `loadGoLang` function.
export default async function loadGroqfmt(): Promise<Groqfmt | undefined> {
  if (typeof window === 'undefined') {
    return
  }

  const go = new Go()

  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('/groqfmt.wasm'),
    go.importObject,
  )

  go.run(instance)
  return groqfmt
}
