import React, { createContext, useCallback, useEffect, useState } from 'react';
import { FileShrub } from '../../types';
import { getDefaultPath, getFileShrub, setBasePath } from '../lib/fileService';
import { openPathDialog, testImagePath } from '../lib/utils';

const FileContext = createContext({
  changeDir: () => undefined,
  expand: (path: string) => undefined,
  fileShrub: {} as FileShrub,
  path: '',
  selected: '',
  setSelected: (path: string) => undefined,
});

export const FileContextComponent = ({ children }) => {
  const [fileShrub, setFileShrub] = useState({} as FileShrub);
  const [path, setPath] = useState('');
  const [selected, setSelected] = useState('');

  console.log('path');
  console.log(path);
  console.log('selected');
  console.log(selected);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    if (fileShrub[path]?.branches || testImagePath(path)) return;
    getFileShrub(path)
      .then(_fileShrub => setFileShrub(oldFileShrub => ({ ...oldFileShrub, ..._fileShrub })))
      .catch(console.log);
  }, [path, setFileShrub]);

  useEffect(() => {
    const node = fileShrub[path]
      ?.branches
      ?.find(branch => !fileShrub[branch].isFile && !fileShrub[branch].branches);
    node && expand(node);
  }, [fileShrub, path]);

  const changeDir = useCallback(() => {
    openPathDialog(path)
      .then((dialogRes: Electron.OpenDialogReturnValue) => {
        const _path = dialogRes?.filePaths[0];
        if (_path) {
          setBasePath(_path);
          setTimeout(() => {
            setPath(_path);
            setSelected('');
          }, 150); //just giving socket.io some time
        }
      })
      .catch(console.log);
  }, [setPath, path]);

  const expand = useCallback((_path: string) => {
    getFileShrub(_path)
      .then(_fileShrub => {
        setFileShrub(oldFileShrub => ({
          ...oldFileShrub,
          ..._fileShrub,
        }));
      })
      .catch(console.log);

  }, [setFileShrub]);

  return <FileContext.Provider value={{ changeDir, expand, fileShrub, path, selected, setSelected }}>
    {children}
  </FileContext.Provider>;
};

export default FileContext;
