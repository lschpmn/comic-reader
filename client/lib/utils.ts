import { ipcRenderer } from 'electron';
import { extname } from 'path';
import { IMAGE_TYPES } from '../../constants';

export function openPathDialog(path: string) {
  return ipcRenderer.invoke('select-directory', path);
}

export const testImagePath = (imgPath: string) => IMAGE_TYPES.includes(extname(imgPath).toLowerCase());
