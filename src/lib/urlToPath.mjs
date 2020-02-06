import path from 'path'

import { keyToParts } from './keyToParts.mjs'
import { keyPartsToPath } from './keyPartsToPath.mjs'

export const urlToPath = ({ dir, url }) => {
  const parts = keyToParts(url)
  const keyPath = keyPartsToPath(parts)

  const filePath = path.join(dir, keyPath)

  return filePath
}
