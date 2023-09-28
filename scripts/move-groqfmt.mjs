import { EOL } from 'node:os'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import revisionHash from 'rev-hash'

const inputPath = join('node_modules', '@groqfmt', 'wasm', 'dist')
const outputPath = 'public'

const file = readFileSync(join(inputPath, 'groqfmt.wasm'))
const outputFilename = `groqfmt-${revisionHash(file)}.wasm`

mkdirSync(outputPath, { recursive: true })
writeFileSync(join(outputPath, outputFilename), file)

process.stdout.write(outputFilename + EOL)
