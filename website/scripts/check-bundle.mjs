import { readdir, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const root = new URL('../dist/', import.meta.url)
const limits = { js: 450_000, css: 80_000, total: 3_000_000 }
const totals = { js: 0, css: 0, total: 0 }

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name)
    const info = await stat(path)
    if (info.isDirectory()) {
      await walk(path)
      continue
    }
    totals.total += info.size
    const ext = extname(name)
    if (ext === '.js') totals.js += info.size
    if (ext === '.css') totals.css += info.size
  }
}

await walk(root.pathname)
const fmt = bytes => `${(bytes / 1024).toFixed(1)} KiB`
console.log(`Bundle budget: JS ${fmt(totals.js)}, CSS ${fmt(totals.css)}, total ${fmt(totals.total)}`)

const failures = []
if (totals.js > limits.js) failures.push(`JS exceeds ${fmt(limits.js)}`)
if (totals.css > limits.css) failures.push(`CSS exceeds ${fmt(limits.css)}`)
if (totals.total > limits.total) failures.push(`dist exceeds ${fmt(limits.total)}`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
