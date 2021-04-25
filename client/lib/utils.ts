import { ipcRenderer } from 'electron';

export function openPathDialog(path: string) {
  return ipcRenderer.invoke('select-directory', path);
}
