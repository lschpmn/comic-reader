import { FILE_GET_DEFAULT, FILE_LIST, FILE_SET_PATH } from '../../constants';
import { FileShrub } from '../../types';
import socket from './socket';

export function getDefaultPath(): Promise<string> {
  return new Promise(res => socket.emit(FILE_GET_DEFAULT, path => res(path)));
}

export function getFileShrub(path: string): Promise<FileShrub> {
  return new Promise(res => socket.emit(FILE_LIST, path, files => res(files)));
}

export function setBasePath(path: string) {
  socket.emit(FILE_SET_PATH, path);
}
