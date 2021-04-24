import { ipcRenderer } from 'electron';

export async function openPathDialog(path: string) {
  const response = await ipcRenderer.invoke('select-directory', path);
  console.log('response');
  console.log(response);
  return response;
}
