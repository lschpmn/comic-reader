import { readdir } from 'fs-extra';
import { join, sep } from 'path';

console.log(__dirname);

export function getDefaultPath(): string[] {
  return join(__dirname, '..').split(sep);
}

export async function listFiles(path: string): Promise<string[]> {
  try {
    return await readdir(path);
  } catch (err) {
    console.log('listFiles error');
    console.log(err);
    return null;
  }
}
