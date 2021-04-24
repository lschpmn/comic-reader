import { readdir, stat } from 'fs-extra';
import { join } from 'path';
import { FileShrub } from '../types';

console.log(__dirname);

export function getDefaultPath(): string {
  return join(__dirname, '..');
}

export async function getFileShrub(path: string): Promise<FileShrub> {
  try {
    const list = await readdir(path);
    const fileShrub = {
      [path]: { isFile: false, branches: [] },
    } as FileShrub;
    const fileShrubPromises = list.map(async node => {
      try {
        const nodePath = join(path, node);
        const info = await stat(nodePath);
        fileShrub[nodePath] = { isFile: info.isFile() };
        fileShrub[path].branches.push(nodePath);
      } catch (err) {
        console.log(`error with ${node}`);
        console.log(err);
      }
    });
    await Promise.all(fileShrubPromises);

    return fileShrub;
  } catch (err) {
    console.log('listFiles error');
    console.log(err);
    return null;
  }
}
