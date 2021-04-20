import { readdir } from 'fs-extra';
import { join } from 'path';

export async function getDefaultPath() {
  return readdir(join(__dirname, '..'));
}
