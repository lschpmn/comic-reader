import { readdir } from 'fs-extra';
import { join, sep } from 'path';

console.log(__dirname);

export function getDefaultPath(): string[] {
  return join(__dirname, '..').split(sep);
}

export function listFiles(path: string): Promise<string[]> {
  return readdir(path);
}
