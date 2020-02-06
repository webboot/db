import path from 'path'

import { is, tryCatch } from '@magic/test'

import { keyToParts, keyPartsToPath } from '../../src/lib/index.mjs'

const parts = keyToParts('sub2.sub1.abc.com')

export default [
  { fn: tryCatch(keyPartsToPath), expect: is.error, info: 'empty arg errors' },
  {
    fn: tryCatch(keyPartsToPath, ''),
    expect: t => t.code === 'E_ARG_TYPE',
    info: 'empty string arg errors',
  },
  {
    fn: tryCatch(keyPartsToPath, 'name.com'),
    expect: t => t.code === 'E_ARG_TYPE',
    info: 'non-empty string arg errors',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: 'com', subdomains: [] }),
    expect: t => t.code === 'E_HOSTNAME_TYPE',
    info: 'missing hostname errors with E_HOSTNAME_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: 'com', subdomains: [], hostname: 'string' }),
    expect: t => t.code === 'E_HOSTNAME_TYPE',
    info: 'string hostname errors with E_HOSTNAME_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: 'com', subdomains: [], hostname: { test: true } }),
    expect: t => t.code === 'E_HOSTNAME_TYPE',
    info: 'object hostname errors with E_HOSTNAME_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { subdomains: [] }),
    expect: t => t.code === 'E_TLD_TYPE',
    info: 'missing tld errors with E_TLD_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: [], subdomains: [] }),
    expect: t => t.code === 'E_TLD_TYPE',
    info: 'array tld errors with E_TLD_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: '', subdomains: [] }),
    expect: t => t.code === 'E_TLD_TYPE',
    info: 'empty tld errors with E_TLD_TYPE',
  },
  {
    fn: tryCatch(keyPartsToPath, { tld: 'com', hostname: ['a'], subdomains: {} }),
    expect: t => t.code === 'E_SUBDOMAIN_TYPE',
    info: 'missing subdomain errors with E_SUBDOMAIN_TYPE',
  },
  {
    fn: keyPartsToPath(parts),
    expect: path.join('com', 'a', 'b', 'c', 'sub2', 'sub1'),
    info: 'can handle multiple subdomains',
  },
]
