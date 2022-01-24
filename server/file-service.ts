import { Application } from 'express';
import { readdir, stat } from 'fs-extra';
import * as os from 'os';
import { join } from 'path';
import * as sharp from 'sharp';
import { Socket } from 'socket.io';
import { GET_DEFAULT_PATH, READ_DIR } from '../constants';
import { FileShrub } from '../types';

export function attachSocket(socket: Socket) {
  socket.on(GET_DEFAULT_PATH, (res) => {
    const homeDir = os.homedir();
    res(homeDir);
  });

  socket.on(READ_DIR, (path, res) => getFileShrub(path).then(res));
}

export async function getFileShrub(path: string): Promise<FileShrub> {
  try {
    const fileShrub: FileShrub = {
      [path]: { isFile: false, branches: [] },
    };

    const list = await readdir(path);

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
    console.log(`getFileShrub error at path ${path}`);
    console.log(err);
    return null;
  }
}

export function setApp(app: Application) {
  app.get('/static/image', async (req, res) => {
    const { w, h, p } = req.query;
    const path = decodeURIComponent(p as string);
    console.log(`GET image path ${path}`);

    try {
      if (w && h) {
        const imgBuffer = await sharp(path)
          .resize(+w, +h)
          .toBuffer();

        res.send(imgBuffer);
      } else {
        res.sendFile(path);
      }
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  });
}
