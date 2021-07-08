import { Application } from 'express';
import { readdir, stat } from 'fs-extra';
import { join } from 'path';
import * as sharp from 'sharp';
import { FileShrub } from '../types';

let basePath = '';

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

    fileShrub[path].branches
      .sort((nameA, nameB) => {
        const isFileA = fileShrub[nameA].isFile;
        const isFileB = fileShrub[nameB].isFile;

        if (isFileA && !isFileB) return 1;
        if (!isFileA && isFileB) return -1;

        return nameA.localeCompare(nameB, undefined, { numeric: true });
      });
    return fileShrub;
  } catch (err) {
    console.log('listFiles error');
    console.log(err);
    return null;
  }
}

export function setApp(app: Application) {
  app.get('/static/*', async (req, res) => {
    console.log(`GET image path ${req.originalUrl}`);
    const path = join(basePath, req.params[0]);
    const { w, h } = req.query;

    if (w && h) {
      const imgBuffer = await sharp(path)
        .resize(+w, +h)
        .toBuffer();

      res.send(imgBuffer);
    } else {
      res.sendFile(path);
    }
  });
}

export function setBasePath(newBasePath: string) {
  basePath = newBasePath;
}
