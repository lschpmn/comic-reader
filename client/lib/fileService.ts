import { FILE_GET_DEFAULT, FILE_LIST } from '../../constants';
import socket from './socket';

export function getDefaultPath(): Promise<string[]> {
  return new Promise(res => socket.emit(FILE_GET_DEFAULT, path => res(path)));
}

export function listFiles(path: string[]): Promise<string[]> {
  return new Promise(res => socket.emit(FILE_LIST, path, files => res(files)));
}
