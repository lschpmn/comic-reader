import React, { createContext, useCallback, useEffect, useState } from 'react';
import { FileShrub } from '../../types';
import { getDefaultPath, getFileShrub } from '../lib/fileService';
import { openPathDialog } from '../lib/utils';

const FileContext = createContext({
  changeDir: () => undefined,
  expand: (path: string) => undefined,
  fileShrub: {} as FileShrub,
  path: '',
});

export const FileContextComponent = ({ children }) => {
  const [path, setPath] = useState('');
  const [fileShrub, setFileShrub] = useState({} as FileShrub);

  console.log('path');
  console.log(path);
  console.log('fileShrub');
  console.log(fileShrub);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    getFileShrub(path)
      .then(setFileShrub)
      .catch(console.log);
  }, [path]);

  const changeDir = useCallback(() => {
    openPathDialog(path)
      .then((dialogRes: Electron.OpenDialogReturnValue) => {
        const _path = dialogRes?.filePaths[0];
        _path && setPath(_path);
      })
      .catch(console.log);
  }, [path, setPath]);

  const expand = useCallback((_path: string) => {
    getFileShrub(_path)
      .then(_fileShrub => {
        setFileShrub({
          ...fileShrub,
          ..._fileShrub,
        })
      })
      .catch(console.log);

  }, [fileShrub, setFileShrub]);

  return <FileContext.Provider value={{ changeDir, expand, fileShrub, path }}>
    {children}
  </FileContext.Provider>;
};

export default FileContext;
