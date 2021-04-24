import { ipcRenderer } from 'electron';
import { join } from 'path';

export async function openPathDialog(path: string[]) {
  const response = await ipcRenderer.invoke('select-directory', join(...path));
  console.log('response');
  console.log(response);
  return response;
}
