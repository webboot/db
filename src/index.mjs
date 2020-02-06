import path from 'path'

import error from '@magic/error'
import fs from '@magic/fs'
import is from '@magic/types'

import { urlToPath, put, get } from './lib/index.mjs'

const libName = '@webboot/db'

/* @webboot/db main entry point
 * @module @webboot/db
 * @export db
 * @example import db from '@webboot/db'
 * @return { object } db instance
 */
const db = (dir = 'db') => {
  if (is.empty(dir) || !is.string(dir)) {
    throw error(`${libName} dir must be a non-empty string, got ${typeof dir}`, 'DIR_TYPE')
  }

  if (!path.isAbsolute(dir)) {
    dir = path.join(process.cwd(), dir)
  }

  return {
    urlToPath,
    put: put(dir),
    get: get(dir),
  }
}

export default db
