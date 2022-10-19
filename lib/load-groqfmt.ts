// TODO: This can probably be a generic `loadGoLang` function.
export default async function loadGroqfmt(): Promise<
  ((query: string) => GroqfmtResult) | undefined
> {
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
}
