import error from '@magic/error'
import is from '@magic/types'

const libName = '@webboot/db.lib.keyToParts'

export const keyToParts = key => {
  if (is.empty(key) || !is.string(key)) {
    throw error(`${libName}: key must be a non-empty string, got ${typeof key}`)
  }

  const parts = key.split('.')

  const tld = parts.pop()
  let hostname = parts.pop()

  if (!is.empty(hostname)) {
    hostname = hostname.split('')
  }

  let subdomains = []

  if (parts.length) {
    subdomains = parts
  }

  return {
    hostname,
    subdomains,
    tld,
  }
}
