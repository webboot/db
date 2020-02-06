import path from 'path'

import { is, tryCatch } from '@magic/test'

import { urlToPath } from '../../src/lib/index.mjs'

export default [
  {
    fn: () => urlToPath({ dir: 'db', url: 'name.com' }),
    expect: path.join('db', 'com', 'n', 'a', 'm', 'e'),
  },
]
