import React, { createContext, useEffect, useState } from 'react';
import { getDefaultPath } from '../lib/fileService';

const FileTreeContext = createContext({
  path: [] as string[],
});

export const FileTreeContextComponent = ({ children }) => {
  const [path, setPath] = useState([] as string[]);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  return <FileTreeContext.Provider value={{ path }}>
    {children}
  </FileTreeContext.Provider>
};
