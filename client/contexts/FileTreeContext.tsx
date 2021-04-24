import { sep } from 'path';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { FileTree } from '../../types';
import { getDefaultPath, getFileTree } from '../lib/fileService';
import { openPathDialog } from '../lib/utils';

const FileTreeContext = createContext({
  changeDir: () => undefined,
  path: [] as string[],
  tree: {} as FileTree,
});

export const FileTreeContextComponent = ({ children }) => {
  const [path, setPath] = useState([] as string[]);
  const [tree, setTree] = useState({ isFile: false } as FileTree);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    getFileTree(path)
      .then(setTree)
      .catch(console.log);
  }, [path]);

  const changeDir = useCallback(() => {
    openPathDialog(path)
      .then((dialogRes: Electron.OpenDialogReturnValue) => {
        const _path = dialogRes?.filePaths[0];
        _path && setPath(_path.split(sep));
      })
      .catch(console.log);
  }, [path, setPath]);

  return <FileTreeContext.Provider value={{ changeDir, path, tree }}>
    {children}
  </FileTreeContext.Provider>;
};

export default FileTreeContext;
