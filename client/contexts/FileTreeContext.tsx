import React, { createContext, useState } from 'react';

const FileTreeContext = createContext({
  path: [] as string[],
});

export const FileTreeContextComponent = ({ children }) => {
  const [path, setPath] = useState([] as string[]);

  return <FileTreeContext.Provider value={{ path }}>
    {children}
  </FileTreeContext.Provider>
};
