import path from 'path'

import { fs, is } from '@magic/test'

import DB from '../src/index.mjs'

const dbDir = path.join(process.cwd(), 'test', '.fixtures')

const before = () => {
  return async () => {
    console.log('rm dbDir', dbDir)
    await fs.rmrf(dbDir)
  }
}

const fn = async () => {

  const db = DB(dbDir)

  const put = await db.put({ url: 'test.key', version: '0.0.1', value: 'valuetest' })

  const get = await db.get({ url: 'test.key', version: '0.0.1' })

  return get
}

export default [
  { fn, before, expect: 'valuetest', info: 'db can put and get' },
]
