import { ipcRenderer } from 'electron';
import { extname } from 'path';
import { shallowEqual, useSelector } from 'react-redux';
import { IMAGE_TYPES } from '../../constants';
import { FileShrub } from '../../types';
import { ReduxStore } from '../types';

export function openPathDialog(path: string) {
  return ipcRenderer.invoke('select-directory', path);
}

export function useFileShrubForPath(path: string): FileShrub {
  return useSelector((store: ReduxStore) => {
    const shrub = {};
    store.fileShrub[path]?.branches?.forEach(branch => shrub[branch] = store.fileShrub[branch]);
    return shrub;
  }, shallowEqual);
}

export const testImagePath = (imgPath: string) => IMAGE_TYPES.includes(extname(imgPath).toLowerCase());
