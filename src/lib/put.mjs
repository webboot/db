import path from 'path'

import error from '@magic/error'
import fs from '@magic/fs'
import semver from '@magic/semver'
import is from '@magic/types'

import { urlToPath } from './urlToPath.mjs'

const libName = '@webboot/db.put:'

export const put = dir => async (props = {}) => {
  const { url, value, version = false } = props

  if (is.empty(url) || !is.string(url)) {
    throw error(`${libName} url must be a string, got ${typeof url}`, 'URL_TYPE')
  }

  if (is.empty(value)) {
    throw error(`${libName} value must be a string or buffer, got ${typeof url}`, 'VALUE_TYPE')
  }

  const urlPath = urlToPath({ dir, url })

  if (version === false) {

  }

  if (is.empty(version) || !semver.isSemver(version)) {
    throw error(`${libName}.get version must be a semver verson, got ${typeof version}`, 'VERSION_TYPE')
  }

  const filePath = path.join(urlPath, `${version}.json`)

  if (await fs.exists(filePath)) {
    throw error(`${libName} @webboot/db is immutable. ${filePath} exists.`, 'E_URL_VERSION_EXISTS')
  }

  const fileDir = path.dirname(filePath)

  await fs.mkdirp(fileDir)

  const contents = JSON.stringify(value)

  await fs.writeFile(filePath, contents)

  return filePath
}
