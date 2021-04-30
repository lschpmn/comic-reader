import { relative } from 'path';
import React from 'react';

const port: number = (window as any).__PORT__;

type Props = {
  path: string,
  selected: string,
};

export default ({ path, selected }: Props) => {
  const relativePath = relative(path, selected);

  return <div>
    <img
      src={`http://localhost:${port}/static/${relativePath}`}
    />
  </div>
};
