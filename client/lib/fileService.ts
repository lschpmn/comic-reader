import { FILE_GET_DEFAULT, FILE_LIST } from '../../constants';
import { FileTree } from '../../types';
import socket from './socket';

export function getDefaultPath(): Promise<string[]> {
  return new Promise(res => socket.emit(FILE_GET_DEFAULT, path => res(path)));
}

export function getFileTree(path: string[]): Promise<FileTree> {
  return new Promise(res => socket.emit(FILE_LIST, path, files => res(files)));
}
