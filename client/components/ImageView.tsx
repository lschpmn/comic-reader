import { relative } from 'path';
import React from 'react';

const port: number = (window as any).__PORT__;

type Props = {
  path: string,
  selected: string,
};

export default ({ path, selected }: Props) => {
  const relativePath = relative(path, selected);

  return <div style={{ height: '100%', width: '100%' }}>
    <img
      src={`http://localhost:${port}/static/${relativePath}`}
      style={{ maxHeight: '100%', maxWidth: '100%' }}
    />
  </div>
};
