import { is, tryCatch } from '@magic/test'

import db from '../src/index.mjs'

export default [{ fn: () => db(), expect: is.object, info: 'db is a fn that returns an object' }]
