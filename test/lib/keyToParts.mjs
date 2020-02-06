import { is, tryCatch } from '@magic/test'

import { keyToParts } from '../../src/lib/index.mjs'

export default [
  { fn: tryCatch(keyToParts), expect: is.error, info: 'keyToParts without arg errors' },
  {
    fn: tryCatch(keyToParts, ''),
    expect: is.error,
    info: 'keyToParts with empty string arg errors',
  },
  {
    fn: tryCatch(keyToParts, 'name.com'),
    expect: is.deep.eq({ tld: 'com', hostname: ['n', 'a', 'm', 'e'], subdomains: [] }),
    info: 'keyToParts with empty string arg errors',
  },
  {
    fn: keyToParts('sub2.sub1.abc.com'),
    expect: is.deep.eq({ tld: 'com', hostname: ['a', 'b', 'c'], subdomains: ['sub2', 'sub1'] }),
    info: 'can handle multiple subdomains',
  },
]
