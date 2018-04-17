import * as path from 'path'
import * as fs from 'fs'
import * as solc from 'solc'

function compile(file: string): {[key:string]:any} {
  const where = path.resolve(__dirname, `${file}.sol`),
    src = fs.readFileSync(where, 'utf8');

  return solc.compile(src, 1).contracts[`:${file[0].toUpperCase()}${file.slice(1)}`];
}

export default compile
