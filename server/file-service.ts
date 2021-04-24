import { readdir, stat } from 'fs-extra';
import { join, sep } from 'path';
import { FileTree } from '../types';

console.log(__dirname);

export function getDefaultPath(): string[] {
  return join(__dirname, '..').split(sep);
}

export async function getFileTree(path: string): Promise<FileTree> {
  try {
    const list = await readdir(path);
    const fileTree = {};
    const fileTreePromises = list.map(async node => {
      try {
        const info = await stat(join(path, node));
        fileTree[node] = { isFile: info.isFile() };
      } catch (err) {
        console.log(`error with ${node}`);
        console.log(err);
      }
    });
    await Promise.all(fileTreePromises);

    return {
      isFile: false,
      fileTree,
    };
  } catch (err) {
    console.log('listFiles error');
    console.log(err);
    return null;
  }
}
