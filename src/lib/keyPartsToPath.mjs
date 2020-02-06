import path from 'path'

import error from '@magic/error'
import is from '@magic/types'

const libName = '@webboot/db.lib.keyPartsToPath'

export const keyPartsToPath = props => {
  if (is.empty(props) || !is.objectNative(props)) {
    throw error(`${libName}: props must be a non-empty object`, 'ARG_TYPE')
  }

  const { tld, hostname, subdomains } = props

  if (is.empty(tld) || !is.string(tld)) {
    throw error(`${libName}: tld must be a non-empty string, got ${typeof tld}`, 'TLD_TYPE')
  }

  if (is.empty(hostname) || !is.array(hostname)) {
    throw error(
      `${libName}: hostname must be a non-empty array, got ${typeof hostname}`,
      'HOSTNAME_TYPE',
    )
  }

  if (!is.array(subdomains)) {
    throw error(
      `${libName}: subdomains must be an array, got ${typeof subdomains}`,
      'SUBDOMAIN_TYPE',
    )
  }

  return path.join(tld, ...hostname, ...subdomains)
}
