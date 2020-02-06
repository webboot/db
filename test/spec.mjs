import { is, tryCatch } from '@magic/test'

import db from '../src/index.mjs'

export default [
  { fn: () => db, expect: is.function, info: 'db is a function' },
  { fn: () => db(), expect: is.object, info: 'db returns an object when called' },
  { fn: () => db().get, expect: is.fn, info: 'db.get is a function' },
  { fn: () => db().put, expect: is.fn, info: 'db.put is a function' },
]
