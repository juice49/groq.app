// TODO: This can probably be a generic `loadGoLang` function.
export default async function loadGroqfmt(): Promise<
  ((query: string) => GroqfmtResult) | undefined
> {
  if (typeof window === 'undefined') {
    return
  }

  const go = new Go()

  const { instance } = await WebAssembly.instantiateStreaming(
    fetch(
      '/groqfmt-full-a114f73af5a94907e425ef0e342e2c51e8a39a0801b6766394cc912017cc1845.wasm',
    ),
    go.importObject,
  )

  go.run(instance)
  return groqfmt
}
