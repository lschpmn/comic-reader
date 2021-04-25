import { ipcRenderer } from 'electron';
import { useMemo } from 'react';
import { FileShrub } from '../../types';

export function openPathDialog(path: string) {
  return ipcRenderer.invoke('select-directory', path);
}

export function useNodes(fileShrub: FileShrub, _nodes: string[]=[]) {
  return useMemo(() => {
    const nodes = [..._nodes]
      .sort((nameA, nameB) => nameA.localeCompare(nameB, undefined, { numeric: true }));

    const directories = nodes.filter(node => !fileShrub[node].isFile);
    const files = nodes.filter(node => fileShrub[node].isFile);

    return [directories, files];
  }, [fileShrub, _nodes]);
}
