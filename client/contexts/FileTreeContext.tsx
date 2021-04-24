import React, { createContext, useEffect, useState } from 'react';
import { FileTree } from '../../types';
import { getDefaultPath, getFileTree } from '../lib/fileService';

const FileTreeContext = createContext({
  path: [] as string[],
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
    getFileTree(path)
      .then(_fileTree => setTree)
      .catch(console.log);
  }, [path]);

  return <FileTreeContext.Provider value={{ path }}>
    {children}
  </FileTreeContext.Provider>;
};
