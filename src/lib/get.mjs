import path from 'path'

import error from '@magic/error'
import fs from '@magic/fs'
import is from '@magic/types'
import semver from '@magic/semver'

import { urlToPath } from './urlToPath.mjs'

const libName = '@webboot/db.get'

export const get = dir => async (props = {}) => {
  const { url, version = false, value = undefined } = props

  if (is.empty(url) || !is.string(url)) {
    throw error(`${libName}.get url must be a string, got ${typeof url}`, 'URL_TYPE')
  }

  if (is.empty(version) || !semver.isSemver(version)) {
    throw error(`${libName}.get version must be a semver verson, got ${typeof version}`, 'VERSION_TYPE')
  }

  const filePath = urlToPath({ dir, url })

  try {
    const contents = await fs.readFile(path.join(filePath, `${version}.json`))
    return JSON.parse(contents)
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw error(`${libName} ${version} for ${url} does not exist.`)
    }

    throw e
  }
}
